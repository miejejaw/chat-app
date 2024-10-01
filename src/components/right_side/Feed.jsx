import Top from "./Top.jsx";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatMessage from "./ChatMessage.jsx";
import PropTypes from "prop-types";

const Feed = ({messages, user}) => {

    return (
        <section className='w-full h-full bg-opacity-85 bg-iceberg-blue flex flex-col'>
            {/*top section*/}
            <Top user={user}/>

            {/*chat messages*/}
            <div className='px-20 mb-4 flex-grow flex flex-col justify-end border-gray-300 border-t-2 border-l-2 space-y-1'>
                {messages.map((message, index) => (
                    <ChatMessage key={index} user={user} message={message}/>
                ))}
            </div>

            {/*message input bar*/}
            <div className='bg-white h-14 px-20 border-2 flex justify-between items-center'>
                <AttachFileIcon fontSize='large' className='text-gray-400'/>
                <input type='text' placeholder='Type a message' className='w-full h-full ml-2 outline-none text-rich-black'/>
                <div className='flex space-x-2'>
                        <SentimentSatisfiedAltIcon fontSize='large' className='w-10 h-10 text-gray-400'/>
                        <MicIcon fontSize='large' className='text-gray-400'/>
                        <SendIcon fontSize='large' className='text-iceberg-blue'/>
                    </div>
            </div>
        </section>
    );
}

Feed.propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
}
export default Feed;
