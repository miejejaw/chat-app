import SearchBar from "./SearchBar.jsx";
import PropTypes from "prop-types";
import PersonList from "./PersonList.jsx";
import {useSelector} from "react-redux";

const LeftSideBar = ({onPersonClick, selectedPerson}) => {
    const friends = useSelector((state) => state.friend.friends);

    return (
        <section className='bg-white flex flex-col h-full w-2/5'>
            <SearchBar />

            <div className='flex-grow overflow-y-scroll chat-bar-scrollbar'>
                {
                    Object.keys(friends).map((id) => (
                        <PersonList
                            key={friends[id].profile.id}
                            person={friends[id]}
                            onPersonClick={onPersonClick}
                            selectedPerson={selectedPerson}
                        />
                    ))
                }
            </div>

        </section>
    );
}

LeftSideBar.propTypes = {
    onPersonClick: PropTypes.func.isRequired,
    selectedPerson: PropTypes.number
}

export default LeftSideBar;
