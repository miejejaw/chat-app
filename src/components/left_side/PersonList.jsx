import PropTypes from "prop-types";

const PersonList = ({person, onPersonClick}) => {
    return (
        <section onClick={()=> onPersonClick(person.id)} className='w-full flex hover:bg-light-grey hover:cursor-pointer p-2 pl-4'>
            <div
                className={`${person.profilePic === "" && "bg-light-green text-white text-xl"} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                {person.profilePic !== '' ? <img src={person.profilePic} alt='profile' className='w-full'/> : person.name[0]}
            </div>

            <article className='pl-2 w-[270px]'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-rich-black font-semibold'>{person.name}</h1>
                    <span className='text-navy-grey text-sm'>{person.time}</span>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-navy-grey overflow-hidden whitespace-nowrap text-ellipsis'>{person.message}</p>
                    {
                        person.unread > 0 &&
                        <span
                            className='bg-custom-blue w-[15px] h-[15px] rounded-full text-white text-sm flex justify-center items-center'>
                            {person.unread}
                        </span>
                    }
                </div>
            </article>
        </section>
    )
}

PersonList.propTypes = {
    person: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        unread: PropTypes.number.isRequired,
        profilePic: PropTypes.string.isRequired
    }).isRequired,
    onPersonClick: PropTypes.func.isRequired
}
export default PersonList;