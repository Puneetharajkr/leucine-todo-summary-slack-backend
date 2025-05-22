const axios = require('axios');
const { pool } = require('../config/db');

// Simulated summary without OpenAI
exports.summarizeTodos = async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT task FROM todos WHERE is_completed = false'
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'No pending todos to summarize' });
    }

    const todos = rows.map(row => row.task);

    // Simulated summary (you can modify this sentence if you want)
    const summary = `You have ${todos.length} pending tasks. Stay focused and complete the most important ones first!`;

    // Send to Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await axios.post(process.env.SLACK_WEBHOOK_URL, {
          text: `📝 *Todo Summary*:\n${summary}\n\n*Tasks*:\n${todos.map(t => `• ${t}`).join('\n')}`,
          mrkdwn: true
        });
      } catch (slackError) {
        console.error('Slack Error:', slackError.message);
        return res.json({ 
          summary, 
          warning: 'Summary generated but failed to send to Slack'
        });
      }
    }

    res.json({ summary });
  } catch (err) {
    console.error('Summary Error:', err.message);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};
