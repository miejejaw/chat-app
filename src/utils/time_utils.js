const formatTime = (datetime) => {
    const time = datetime.split(" ")[1]; // Extracts the time part
    return time.substring(0, 5); // Gets the first 5 characters (HH:MM)
};

export default formatTime;