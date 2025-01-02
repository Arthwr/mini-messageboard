const { format } = require("date-fns");

const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return `${format(date, "HH:mm")} on ${format(date, "EEEE, dd:MM:yyyy")}`;
  } catch (error) {
    console.error("Invalid timestamp provided", timestamp);
    return "undefined date";
  }
};

const formatMessage = (message) => ({
  ...message,
  username: message.username.charAt(0).toUpperCase() + message.username.slice(1),
  sent_at: formatTimestamp(message.sent_at),
});

module.exports = formatMessage;
