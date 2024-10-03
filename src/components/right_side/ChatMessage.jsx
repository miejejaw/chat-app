import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import formatTime from '../../utils/time_utils.js'; // Import the formatTime function


const ChatMessage = ({message, user}) => {
    const userData = useSelector((state) => state.user.profile);
    const currentUser = {
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        message: "I need help with my memory.",
        time: "18:46",
        unread: 2,
        profile_image_url: userData.profile_image_url
    };

    const isSelf = message.is_self;

    const userFullName = `${user.first_name} ${user.last_name}`;
    const currentUserFullName = `${currentUser.first_name} ${currentUser.last_name}`;

    // Format the message time
    const formattedTime = formatTime(message.time);

    return (
        <div className={`flex items-end ${isSelf ? "justify-end" : "justify-start"} space-x-2`}>

            {/* For other user's message, display profile pic on the left */}
            {!isSelf && (
                <div
                    className={`${user.profile_image_url === "" ? "bg-light-green text-white text-xl" : ""} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                    {user.profile_image_url !== "" ? (
                        <img src={user.profile_image_url} alt="profile" className="w-full"/>
                    ) : (
                        userFullName[0] // Show the first letter of the full name
                    )}
                </div>
            )}

            {/* Message bubble */}
            <div className={`${
                isSelf
                    ? "bg-light-green rounded-tr-xl rounded-tl-xl rounded-bl-xl" // Owner's message (right-aligned)
                    : "bg-light-grey rounded-tr-xl rounded-tl-xl rounded-br-xl" // Other's message (left-aligned)
            } inline-block px-3 py-2 relative max-w-[55%] break-words`}>
                <p className="text-rich-black mb-3">{message.message}</p>

                {/* Timestamp */}
                <span
                    className={`absolute bottom-0 ${isSelf ? "right-7" : "right-4"} text-navy-grey text-sm`}>
                    {formattedTime} {/* Display formatted time */}
                </span>

                {/* For owner messages, display checkmark */}
                {isSelf && (
                    <CheckIcon fontSize="small" className="absolute bottom-0 right-1 text-white"/>
                )}
            </div>

            {/* For owner's message, display profile pic on the right */}
            {isSelf && (
                <div
                    className={`${currentUser.profile_image_url === "" ? "bg-light-green text-white text-xl" : ""} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-end`}>
                    {currentUser.profile_image_url !== "" ? (
                        <img src={currentUser.profile_image_url} alt="profile" className="w-full"/>
                    ) : (
                        currentUserFullName[0] // Show the first letter of the current user's full name
                    )}
                </div>
            )}
        </div>
    );
}

ChatMessage.propTypes = {
    message: PropTypes.shape({
        first_name: PropTypes.string.isRequired, // 'first_name' is required and must be a string
        last_name: PropTypes.string.isRequired,  // 'last_name' is required and must be a string
        message: PropTypes.string.isRequired, // 'message' is required and must be a string
        time: PropTypes.string.isRequired, // 'time' is required and must be a string
        profile_image_url: PropTypes.string, // 'profile_image_url' can be a string (optional)
        is_self: PropTypes.bool.isRequired, // 'is_self' is required and must be a boolean
    }).isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        profile_image_url: PropTypes.string.isRequired
    }).isRequired
};

export default ChatMessage;
