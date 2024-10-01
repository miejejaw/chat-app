import SearchBar from "./SearchBar.jsx";
import PropTypes from "prop-types";
import PersonList from "./PersonList.jsx";

const LeftSideBar = ({persons, onPersonClick}) => {
    return (
        <section className='bg-white h-full max-w-1/4 min-w-fit'>
            <SearchBar />

            <div className='h-[calc(100%-64px)] overflow-y-scroll custom-scrollbar'>
                {persons.map(person => (
                    <PersonList key={person.id} person={person} onPersonClick={onPersonClick}/>
                ))}
            </div>

        </section>
    )
}

LeftSideBar.propTypes = {
    persons: PropTypes.array.isRequired,
    onPersonClick: PropTypes.func.isRequired
}
export default LeftSideBar