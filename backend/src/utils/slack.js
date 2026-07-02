const sendSlackNotification = async (message) => {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn('SLACK_WEBHOOK_URL is not defined in .env. Skipping notification.');
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: message }),
        });

        if (!response.ok) {
            throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
        }

        console.log('Slack notification sent via fetch successfully');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
};

module.exports = { sendSlackNotification };
