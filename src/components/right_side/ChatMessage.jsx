import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";

const currentUser  =     {
    "id": 1,
    "name": "Jessica Drew",
    "message": "I need help with my memory.",
    "time": "18:46",
    "unread": 2,
    "profilePic": "/avatars/3.svg"
}


const ChatMessage = ({message, user}) => {
    const isSelf = message.isSelf; // Assuming `message.isSelf` is a boolean that tells if the message is from the user

    return (
        <div className={`flex items-end ${isSelf ? "justify-end" : "justify-start"} space-x-2`}>

            {/* For other user's message, display profile pic on the left */}
            {!isSelf && (
                <div
                    className={`${user.profilePic === "" ? "bg-light-green text-white text-xl" : ""} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                    {user.profilePic !== "" ? (
                        <img src={user.profilePic} alt="profile" className="w-full"/>
                    ) : (
                        user.name[0]
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
                    className={`absolute bottom-0 ${isSelf ? "right-7" : "right-4"} text-navy-grey text-sm`}>{message.time}</span>

                {/* For owner messages, display checkmark */}
                {isSelf && (
                    <CheckIcon fontSize="small" className="absolute bottom-0 right-1 text-white"/>
                )}
            </div>

            {/* For owner's message, display profile pic on the right */}
            {isSelf && (
                <div
                    className={`${currentUser.profilePic === "" ? "bg-light-green text-white text-xl" : ""} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-end`}>
                    {currentUser.profilePic !== "" ? (
                        <img src={currentUser.profilePic} alt="profile" className="w-full"/>
                    ) : (
                        currentUser.name[0]
                    )}
                </div>
            )}
        </div>
    );
}

ChatMessage.propTypes = {
    message: PropTypes.shape({
        name: PropTypes.string.isRequired, // 'name' is required and must be a string
        message: PropTypes.string.isRequired, // 'message' is required and must be a string
        time: PropTypes.string.isRequired, // 'time' is required and must be a string
        profile: PropTypes.string, // 'profile' can be a string (optional)
        isSelf: PropTypes.bool.isRequired, // 'isSelf' is required and must be a boolean
    }).isRequired,
    user: PropTypes.object.isRequired
};

export default ChatMessage;