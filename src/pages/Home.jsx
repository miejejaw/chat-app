import LeftSideBar from "../components/left_side/LeftSideBar.jsx";
import Feed from "../components/right_side/Feed.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import WebSocketService from '../utils/websocket.js';
import {fetchFriends} from "../features/friends/friendThunks.js";
import {friendActions} from "../features/friends/friendSlice.js";


const Home = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedSearchFriend, setSelectedSearchFriend] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const userData = useSelector((state) => state.user.profile);
    const friends = useSelector((state) => state.friend.friends);
    const messages = useSelector((state) => state.friend.messages);
    const filteredFriends = useSelector((state) => state.friend.searchResults);

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    // Handle person selection
    const handlePersonClick = (personId) => {
        setSelectedPerson(personId);
    };

    // Fetch friends list
    useEffect(() => {
        dispatch(fetchFriends())
            .then(() => setLoading(false))
            .catch((err) => setError(err.message));

        const wsService = WebSocketService.getInstance();
        wsService.connect(userData.id);
    }, [userData.id]);

    // listen for new messages
    const wsService = WebSocketService.getInstance();

    wsService.addCallbacks(userData.id, (newMessage) => {
        dispatch(friendActions.updateFriendLastMessage(newMessage));
        dispatch(friendActions.addMessage(newMessage));
    });



    // Conditional rendering for loading and error states
    if (loading) {
        return <div>Loading friends list...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex w-screen h-screen bg-cover bg-center' style={{backgroundImage: "url('/chat-background.svg')"}}>
            <LeftSideBar
                onPersonClick={handlePersonClick}
                selectedPerson={selectedPerson}
                onSearchFriendClick={setSelectedSearchFriend}
                selectedSearchFriend={selectedSearchFriend}
            />

            {
                selectedSearchFriend ?
                    <Feed
                        friend={filteredFriends[selectedSearchFriend]}
                        id={filteredFriends[selectedSearchFriend].profile.id}
                        messages={messages[selectedSearchFriend]}
                    /> : selectedPerson === null ?
                    <div className='w-full h-full bg-opacity-85 bg-iceberg-blue flex justify-center items-center text-lg text-white'>Select a person to chat</div> :
                        <Feed
                            friend={friends[selectedPerson]}
                            id={friends[selectedPerson].profile.id}
                            messages={messages[selectedPerson]}
                        />

            }
        </div>
    );
}


export default Home;