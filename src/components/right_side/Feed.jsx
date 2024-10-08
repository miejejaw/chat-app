import Top from "./Top.jsx";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatMessage from "./ChatMessage.jsx";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import WebSocketService from '../../utils/websocket.js';
import { getFormattedDate } from '../../utils/time_utils.js';
import React from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import {headers} from "../../features/auth/authApi.js";
import {friendActions} from "../../features/friends/friendSlice.js";
import {useDispatch} from "react-redux";

const Feed = ({friend, id, messages}) => {
    const [messageContent, setMessageContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const dispatch = useDispatch();


    const wsService = WebSocketService.getInstance();

    const sendMessage = () => {
        const content = messageContent.trim();
        if (content === '') return;

        const message = {
            receiver_id: id,
            content: content,
        };

        wsService.sendMessage(message);
        setMessageContent('');

        // Scroll to the bottom after sending the message
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleMessageContent = (e) => {
        setMessageContent(e.target.value);
    };

    const handleEmojiSelect = (emoji) => {
        setMessageContent((prevMessage) => prevMessage + emoji.native); // Add emoji to the message
        setShowEmojiPicker(false); // Hide emoji picker after selection
    };

    // Handle clicks outside emoji picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false); // Close emoji picker
            }
        };

        if (showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup the event listener
        };
    }, [showEmojiPicker]);

    const base_url = import.meta.env.VITE_BASE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching messages for user: ", id);
                const response = await axios.get(`${base_url}/messages/friend/chats?user_id=${id}`, {headers});
                // setMessages({friendId:id, messages:response.data});
                dispatch(friendActions.setMessages({friendId: id, messages: response.data}));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [id]);

    // Keydown event listener for "Enter" to send a message
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        };

        // Add event listener
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [messageContent]);

    return (
        <section className='w-full h-full bg-opacity-85 bg-iceberg-blue flex flex-col'>
            {/* Top section */}
            <Top person={friend} />

            {/* Chat messages */}
            <div className='px-20 mb-1 flex-grow overflow-y-scroll feed-scrollbar flex flex-col-reverse border-gray-300 border-t-2 border-l-2 space-y-1'>
                {/* This div will help us scroll to the bottom */}
                <div ref={messagesEndRef}/>

                {
                    messages && messages.map((message, i) => {
                        const isSameUser = i > 0 && messages[i - 1].is_self === message.is_self;

                        const getDateOnly = (timeString) => new Date(timeString).toISOString().substring(0, 10);

                        let isSameDate = null;

                        if (i === messages.length - 1) {
                            isSameDate = getFormattedDate(message.time);
                        } else if (getDateOnly(message.time) !== getDateOnly(messages[i + 1].time)) {
                            isSameDate = getFormattedDate(message.time);
                        }

                        return (
                            <React.Fragment key={message.id || i}>
                                <ChatMessage
                                    key={message.id || i}
                                    friendProfile={friend.profile}
                                    message={message}
                                    same={isSameUser}
                                />
                                {isSameDate && (
                                    <div className='w-full flex justify-center'>
                                        <div
                                            className='w-fit my-2 px-20 py-1 bg-gray-500 text-center text-gray-300 rounded-xl'>
                                            {isSameDate}
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                })}
            </div>


            {/* Emoji Picker */}
            {showEmojiPicker && (
                <div ref={emojiPickerRef} style={{position: 'absolute', bottom: '80px', right: '50px'}}>
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
            )}

            {/* Message input bar */}
            <div className='bg-white h-16 px-20 border-2 flex justify-between items-center flex-shrink-0'>
                <AttachFileIcon fontSize='large' className='text-gray-400' />

                {/* Input field */}
                <input
                    type='text'
                    value={messageContent}
                    onChange={handleMessageContent}
                    placeholder='Type a message'
                    className='w-full h-full ml-2 outline-none text-rich-black'
                />

                <div className='flex space-x-2 items-center'>
                    {/* Emoji Icon */}
                    <SentimentSatisfiedAltIcon
                        fontSize='large'
                        className='w-10 h-10 text-gray-400 hover:text-gray-500 hover:cursor-pointer'
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle emoji picker visibility
                    />

                    {/* Microphone or Send Button */}
                    {messageContent.trim() === '' ? (
                        <MicIcon fontSize='large' className='text-gray-400 hover:cursor-pointer' />
                    ) : (
                        <SendIcon
                            fontSize='large'
                            className='text-iceberg-blue hover:cursor-pointer'
                            onClick={() => {
                                sendMessage();
                                setMessageContent(''); // Clear input after sending
                            }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

Feed.propTypes = {
    id: PropTypes.number.isRequired,
    friend: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
};

export default Feed;
