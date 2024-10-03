import LeftSideBar from "../components/left_side/LeftSideBar.jsx";
import Feed from "../components/right_side/Feed.jsx";
import {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import axios from "axios";

const Home = () => {
    const [selectedPerson, setSelectedPerson] = useState(0);  // Handle selected person ID directly
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);  // To manage loading state for API request
    const [error, setError] = useState(null);      // To handle errors during fetch

    const userData = useSelector((state) => state.user.profile);

    // Conditionally render loading state for user profile
    if (!userData) {
        return <div>Loading user data...</div>;
    }

    const base_url = import.meta.env.VITE_BASE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/messages/friends?user_id=1`);  // Remove trailing space
                setPersons(response.data);
            } catch (error) {
                setError('Error fetching friends data');
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);  // Stop loading regardless of success or failure
            }
        };

        fetchData();
    }, [base_url]);  // Add base_url as dependency

    // Handle person selection
    const handlePersonClick = (personId) => {
        setSelectedPerson(personId-1);  // Directly set the selected person ID
    };

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
            <Feed friend={persons[selectedPerson].friend} id={persons[selectedPerson].friend.id}/>
        </div>
    );
}

export default Home;