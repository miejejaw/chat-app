export const formatTime = (datetime) => {
    const time = datetime.split(" ")[1]; // Extracts the time part
    return time.substring(0, 5); // Gets the first 5 characters (HH:MM)
};

export const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Get the day of the month
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date); // Short month name (e.g., "Oct")
    return `${month} ${day}`; // Return in "month day" format (e.g., "Oct 5")
};
