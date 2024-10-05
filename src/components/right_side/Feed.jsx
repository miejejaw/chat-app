import Top from "./Top.jsx";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatMessage from "./ChatMessage.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";
import WebSocketService from '../../utils/websocket.js';
import {getFormattedDate} from "../../utils/time_utils.js";
import React from 'react';


const Feed = ({friend, id, messages, setMessages}) => {
    const[messageContent, setMessageContent] = useState('');
    // const [loading, setLoading] = useState(true);  // To manage loading state for API request
    // const [error, setError] = useState(null);      // To handle errors during fetch


    // real-time connect
    const wsService = WebSocketService.getInstance();

    const sendMessage = () => {
        const content = messageContent.trim();
        if(content === '') return;

        const message = {
            receiver_id: friend.profile.id,
            content: content,
        };

        wsService.sendMessage(message);
        setMessageContent('');
    };

    // real-time end

    const handleMessageContent = (e) => {
        setMessageContent(e.target.value);
    }
    const base_url = import.meta.env.VITE_BASE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${base_url}/messages/friend/chats?user_id=${id}`);  // Remove trailing space
                const response = await axios.get(`${base_url}/messages/friend/chats?user_id=${id}`);  // Remove trailing space
                setMessages(response.data);
            } catch (error) {
                // setError('Error fetching friends data');
                console.error("Error fetching data: ", error);
            } finally {
                // setLoading(false);  // Stop loading regardless of success or failure
            }
        };

        fetchData();
    }, [base_url]);

    return (
        <section className='w-full h-full bg-opacity-85 bg-iceberg-blue flex flex-col'>
            {/*top section*/}
            <Top person={friend}/>

            {/*chat messages*/}
            <div className='px-20 mb-1 flex-grow overflow-y-scroll flex flex-col-reverse border-gray-300 border-t-2 border-l-2 space-y-1'>
                {
                    messages.map((message, i) => {
                        // Check if the current message and the previous message are from the same user
                        const isSameUser = i > 0 && messages[i - 1].is_self === message.is_self;

                        // Get date only from the time string
                        const getDateOnly = (timeString) => new Date(timeString).toISOString().substring(0, 10);

                        // Initialize isSameDate
                        let isSameDate = null;

                        // For the first message, just format the date
                        if (i === messages.length - 1) {
                            isSameDate = getFormattedDate(message.time);
                        }
                        // Compare the current message's date with the previous message's date
                        else if (getDateOnly(message.time) !== getDateOnly(messages[i + 1].time)) {
                            isSameDate = getFormattedDate(message.time);
                        }

                        return (
                            <React.Fragment key={i}> {/* Use index as key here */}
                                <ChatMessage
                                    key={message.id || i} // Ensure each ChatMessage has a unique key
                                    friendProfile={friend.profile}
                                    message={message}
                                    same={isSameUser}
                                />
                                {isSameDate && (
                                    <div className='w-full flex justify-center'>
                                        <div className='w-fit px-6 py-1 bg-gray-500 text-center text-gray-300 rounded-xl'>
                                            {isSameDate}
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

            </div>

            {/*message input bar*/}
            <div className='bg-white h-16 px-20 border-2 flex justify-between items-center'>
                <AttachFileIcon fontSize='large' className='text-gray-400'/>
                <input type='text' value={messageContent} onChange={(e) => handleMessageContent(e)} placeholder='Type a message' className='w-full h-full ml-2 outline-none text-rich-black'/>
                <div className='flex space-x-2'>
                        <SentimentSatisfiedAltIcon fontSize='large' className='w-10 h-10 text-gray-400 hover:cursor-pointer'/>
                    {
                        messageContent.trim() === '' ?
                        <MicIcon fontSize='large' className='text-gray-400 hover:cursor-pointer'/> :
                        <SendIcon fontSize='large' className='text-iceberg-blue hover:cursor-pointer' onClick={()=> sendMessage()}/>
                    }
                    </div>
            </div>
        </section>
    );
}

Feed.propTypes = {
    id: PropTypes.number.isRequired,
    friend: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    setMessages: PropTypes.func.isRequired,
}
export default Feed;
