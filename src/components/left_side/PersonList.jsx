import PropTypes from "prop-types";
import {formatTime} from '../../utils/time_utils.js'; // Import the formatTime function

const PersonList = ({person, onPersonClick, selectedPerson}) => {
    const fullName = `${person.profile.first_name} ${person.profile.last_name}`;

    const lastMessageTime = formatTime(person.last_message.time);

    return (
        <section onClick={() => onPersonClick(person.profile.id)}
                 className={`${selectedPerson === person.profile.id && 'bg-light-grey'} w-full flex hover:bg-light-grey hover:cursor-pointer p-2 pl-4`}>
            <div
                className={`${person.profile.profile_image_url === "" && "bg-light-green text-white text-xl"} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                {person.profile.profile_image_url !== '' ? (
                    <img src={person.profile.profile_image_url} alt='profile' className='w-full' />
                ) : (
                    fullName[0]
                )}
            </div>

            <article className='pl-2 flex-grow'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-rich-black font-semibold'>{fullName}</h1>
                    <span className='text-navy-grey text-sm'>{lastMessageTime}</span>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-navy-grey overflow-hidden whitespace-nowrap text-ellipsis'>{person.last_message.content}</p>
                    {
                        person.unread_count > 0 && (
                            <div className='bg-custom-blue min-w-5 max-w-fit rounded-full flex justify-center items-center px-1'>
                                <span className='text-white text-sm'>
                                    {person.unread_count}
                                </span>
                            </div>
                        )
                    }
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
    onPersonClick: PropTypes.func.isRequired,
    selectedPerson: PropTypes.number
}

export default PersonList;
