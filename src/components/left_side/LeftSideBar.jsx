import SearchBar from "./SearchBar.jsx";
import PropTypes from "prop-types";
import PersonList from "./PersonList.jsx";  // Assuming this component is defined

const LeftSideBar = ({ persons, onPersonClick }) => {
    return (
        <section className='bg-white h-full max-w-1/4 min-w-fit'>
            <SearchBar />

            <div className='h-[calc(100%-64px)] overflow-y-scroll custom-scrollbar'>
                {
                    Object.keys(persons).map((id) => (
                        <PersonList
                            key={persons[id].friend.id}
                            person={persons[id]}
                            onPersonClick={onPersonClick}
                        />
                    ))
                }
            </div>

        </section>
    );
}

LeftSideBar.propTypes = {
    persons: PropTypes.object.isRequired,
    onPersonClick: PropTypes.func.isRequired
}

export default LeftSideBar;
