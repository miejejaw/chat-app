import SearchBar from "./SearchBar.jsx";
import PropTypes from "prop-types";
import PersonList from "./PersonList.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {searchUserApi} from "../../features/user/userApi.js";
import {friendActions} from "../../features/friends/friendSlice.js";

const LeftSideBar = ({onPersonClick, selectedPerson, onSearchFriendClick, selectedSearchFriend}) => {
    const friends = useSelector((state) => state.friend.friends);
    const [search, setSearch] = useState('');
    const [sortedIds, setSortedIds] = useState([]);
    const filteredFriends = useSelector((state) => state.friend.searchResults);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchFriends = async () => {
            dispatch(friendActions.clearSearchResults());
            const response = await searchUserApi(search);
            dispatch(friendActions.setSearchResults(response));
        }

        if (search) {
            fetchFriends();
        }

    }, [search]);

    useEffect(() => {
        // Convert the object to an array of entries ([id, friendObject] format)
        const friendsArray = Object.entries(friends);

        // Sort the array based on 'last_message.time'
        const sortedArray = friendsArray.sort((a, b) => {
            return new Date(b[1].last_message.time) - new Date(a[1].last_message.time);
        });

        // Extract only the sorted ids
        const sortedIds = sortedArray.map(([id]) => Number(id));

        // Update the state with sorted ids
        setSortedIds(sortedIds);
    }, [friends]);

    const handleSearch = (value) => {
        if (value === '') {
            dispatch(friendActions.clearSearchResults());
            onSearchFriendClick(null)
        }
        setSearch(value);
    }

    return (
        <section className='bg-white flex flex-col h-full w-2/5'>
            <SearchBar search={search} handleSearch={handleSearch}/>

            <div className='flex-grow overflow-y-scroll chat-bar-scrollbar'>
                {
                    !search ?
                        sortedIds.map((id) => (
                        <PersonList
                            key={friends[id].profile.id}
                            person={friends[id]}
                            onPersonClick={onPersonClick}
                            selectedPerson={selectedPerson}
                        />
                    ))
                        :
                        Object.keys(filteredFriends).map((id) => (
                            <PersonList
                                key={filteredFriends[id].profile.id}
                                person={filteredFriends[id]}
                                onPersonClick={onSearchFriendClick}
                                selectedPerson={selectedSearchFriend}
                            />
                        ))
                }
            </div>
        </section>
    );
}

LeftSideBar.propTypes = {
    onPersonClick: PropTypes.func.isRequired,
    selectedPerson: PropTypes.number,
    onSearchFriendClick: PropTypes.func.isRequired,
    selectedSearchFriend: PropTypes.number
}

export default LeftSideBar;
