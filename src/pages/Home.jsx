import LeftSideBar from "../components/left_side/LeftSideBar.jsx";
import Feed from "../components/right_side/Feed.jsx";
import {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import WebSocketService from '../utils/websocket.js';  // Import the WebSocket service


const Home = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);  // Handle selected person ID directly
    const [persons, setPersons] = useState({});
    const [loading, setLoading] = useState(true);  // To manage loading state for API request
    const [error, setError] = useState(null);      // To handle errors during fetch

    const userData = useSelector((state) => state.user.profile);

    if (!userData) {
        return <div>Loading user data...</div>;
    }
    // Handle person selection
    const handlePersonClick = (personId) => {
        setSelectedPerson(personId);  // Directly set the selected person ID
    };

    // Initialize the WebSocket connection
    useEffect(() => {
        const wsService = WebSocketService.getInstance();

        wsService.connect(userData.id);  // Connect to the WebSocket server

    },[userData.id]);

    const base_url = import.meta.env.VITE_BASE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/messages/friends?user_id=${userData.id}`);  // Remove trailing space
                const data =transformFriendsList(response.data);
                setPersons(data);
            } catch (error) {
                setError('Error fetching friends data');
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);  // Stop loading regardless of success or failure
            }
        };

        fetchData();
    }, [base_url]);  // Add base_url as dependency


    // Conditional rendering for loading and error states
    if (loading) {
        return <div>Loading friends list...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex w-screen h-screen bg-cover bg-center' style={{backgroundImage: "url('/chat-background.svg')"}}>
            <LeftSideBar persons={persons} onPersonClick={handlePersonClick}/>

            {
                selectedPerson === null ?
                    <div className='w-full h-full bg-opacity-85 bg-iceberg-blue flex justify-center items-center text-lg text-white'>Select a person to chat</div> :
                    <Feed friend={persons[selectedPerson].friend} id={persons[selectedPerson].friend.id}/>
            }
        </div>
    );
}

const transformFriendsList = (friends) => {
    const result = {};
    friends.forEach(item => {
        const friendId = item.friend.id; // Get the friend's ID
        result[friendId] = item; // Assign the item under the friend's ID
    });
    return result;
};

export default Home;