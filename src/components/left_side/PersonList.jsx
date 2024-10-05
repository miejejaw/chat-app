import PropTypes from "prop-types";
import formatTime from '../../utils/time_utils.js'; // Import the formatTime function

const PersonList = ({ person, onPersonClick }) => {
    const fullName = `${person.profile.first_name} ${person.profile.last_name}`;

    const lastMessageTime = formatTime(person.last_message.time);

    return (
        <section onClick={() => onPersonClick(person.profile.id)} className='w-full flex hover:bg-light-grey hover:cursor-pointer p-2 pl-4'>
            <div
                className={`${person.profile.profile_image_url === "" && "bg-light-green text-white text-xl"} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                {person.profile.profile_image_url !== '' ? (
                    <img src={person.profile.profile_image_url} alt='profile' className='w-full' />
                ) : (
                    fullName[0]
                )}
            </div>

            <article className='pl-2 w-[270px]'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-rich-black font-semibold'>{fullName}</h1>
                    <span className='text-navy-grey text-sm'>{lastMessageTime}</span>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-navy-grey overflow-hidden whitespace-nowrap text-ellipsis'>{person.last_message.content}</p>
                    {person.unread_count > 0 && (
                        <span className='bg-custom-blue w-[15px] h-[15px] rounded-full text-white text-sm flex justify-center items-center'>
                            {person.unread_count}
                        </span>
                    )}
                </div>
            </article>
        </section>
    );
}

PersonList.propTypes = {
    person: PropTypes.shape({
        profile: PropTypes.shape({
            id: PropTypes.number.isRequired,
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
            profile_image_url: PropTypes.string.isRequired
        }).isRequired,
        unread_count: PropTypes.number.isRequired,
        last_seen: PropTypes.string.isRequired,
        last_message: PropTypes.shape({
            content: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    onPersonClick: PropTypes.func.isRequired
}

export default PersonList;
