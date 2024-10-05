import SearchBar from "./SearchBar.jsx";
import PropTypes from "prop-types";
import PersonList from "./PersonList.jsx";
import {useSelector} from "react-redux";

const LeftSideBar = ({ onPersonClick }) => {
    const friends = useSelector((state) => state.friend.friends);

    return (
        <section className='bg-white h-full max-w-1/4 min-w-fit'>
            <SearchBar />

            <div className='h-[calc(100%-64px)] overflow-y-scroll custom-scrollbar'>
                {
                    Object.keys(friends).map((id) => (
                        <PersonList
                            key={friends[id].profile.id}
                            person={friends[id]}
                            onPersonClick={onPersonClick}
                        />
                    ))
                }
            </div>

        </section>
    );
}

LeftSideBar.propTypes = {
    onPersonClick: PropTypes.func.isRequired
}

export default LeftSideBar;
