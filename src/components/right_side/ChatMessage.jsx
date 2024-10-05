import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import {formatTime} from '../../utils/time_utils.js';
import {useSelector} from "react-redux";


const ChatMessage = ({message, friendProfile, same}) => {

    const currentUser = useSelector((state) => state.user.profile);
    const isSelf = message.is_self;

    const formattedTime = formatTime(message.time);

    return (
        <div className={`mt-1 flex items-end ${isSelf ? "justify-end" : "justify-start"} space-x-2`}>

            {/* For other user's message, display profile pic on the left */}
            {!isSelf && !same && (
                <div
                    className={`${friendProfile.profile_image_url === "" ? "bg-light-green text-white text-xl" : ""} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                    {friendProfile.profile_image_url !== "" ? (
                        <img src={friendProfile.profile_image_url} alt="profile" className="w-full"/>
                    ) : (
                        `${friendProfile.first_name[0]}${friendProfile.last_name[0]}`
                    )}
                </div>
            )}

            {/* Message bubble */}
            <div className={`${
                isSelf
                    ? `${same && "mr-[60px] rounded-br-xl"} bg-light-green rounded-tr-xl rounded-tl-xl rounded-bl-xl` // Owner's message (right-aligned)
                    : `${same && "ml-[60px] rounded-bl-xl"} bg-light-grey rounded-tr-xl rounded-tl-xl rounded-br-xl` // Other's message (left-aligned)
                } inline-block px-3 py-2 relative max-w-[55%] break-words`}>
                <p className="text-rich-black mb-3 pr-16">{message.message}</p>

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
            {isSelf && !same && (
                <div
                    className={`${currentUser.profile_image_url === "" ? "bg-light-green text-white text-xl" : ""} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                    {currentUser.profile_image_url !== "" ? (
                        <img src={currentUser.profile_image_url} alt="profile" className="w-full"/>
                    ) : (
                        `${currentUser.first_name[0]}${currentUser.last_name[0]}`
                    )}
                </div>
            )}
        </div>
    );
}

ChatMessage.propTypes = {
    message: PropTypes.shape({
        message: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        profile_image_url: PropTypes.string,
        is_self: PropTypes.bool.isRequired,
    }).isRequired,
    friendProfile: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        profile_image_url: PropTypes.string.isRequired
    }).isRequired,
    same: PropTypes.bool.isRequired
};

export default ChatMessage;
