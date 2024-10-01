import LeftSideBar from "../components/left_side/LeftSideBar.jsx";
import Feed from "../components/right_side/Feed.jsx";

import {persons} from "../data/persons.js";
import {useState} from "react";

const Home = () => {
    const user  =     {
        "id": 1,
        "name": "Jessica Drew",
        "message": "I need help with my memory.",
        "time": "18:46",
        "unread": 2,
        "profilePic": "/avatars/1.svg"
    }

    const[selectedPerson, setSelectedPerson] = useState(0);
    const handlePersonClick = (personId) => {
        setSelectedPerson(personId-1);  // Update selected person
    };

    return (
        <div className='flex w-screen h-screen bg-cover bg-center' style={{backgroundImage: "url('/chat-background.svg')"}}>
            <LeftSideBar persons={persons} onPersonClick={handlePersonClick}/>
            <Feed user={user} messages={persons[selectedPerson].messages}/>
        </div>
    );
}

export default Home;