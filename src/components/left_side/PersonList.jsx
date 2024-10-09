import PropTypes from "prop-types";
import {formatTime} from '../../utils/time_utils.js';
import ProfilePic from "../ProfilePic.jsx";

const PersonList = ({person, onPersonClick, selectedPerson}) => {
    const fullName = `${person.profile.first_name} ${person.profile.last_name}`;

    return (
        <section onClick={() => onPersonClick(person.profile.id)}
                 className={`${selectedPerson === person.profile.id && 'bg-light-grey'} w-full flex hover:bg-light-grey hover:cursor-pointer p-2 pl-4`}>

            <ProfilePic
                profile_url={person.profile.profile_image_url}
                first_name={person.profile.first_name}
                last_name={person.profile.last_name}
            />

            <article className='pl-2 flex-grow'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-rich-black font-semibold'>{fullName}</h1>
                    {person.last_message &&
                        <span className='text-navy-grey text-sm'>{formatTime(person.last_message.time)}</span>}
                </div>

                {/*Display the last message content and unread count*/}
                {
                    person.last_message && <div className='flex justify-between items-center'>
                        <p className='text-navy-grey overflow-hidden whitespace-nowrap text-ellipsis'>{person.last_message.content}</p>
                        {
                            person.last_message && person.unread_count > 0 && (
                                <div
                                    className='bg-custom-blue min-w-5 max-w-fit rounded-full flex justify-center items-center px-1'>
                                    <span className='text-white text-sm'>
                                        {person.unread_count}
                                    </span>
                                </div>
                            )
                        }
                    </div>
                }

                {/*display username*/}
                {!person.last_message && <p className='text-blue-400'>@{person.profile.username}</p>}
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
            profile_image_url: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
        }).isRequired,
        unread_count: PropTypes.number.isRequired || null,
        last_seen: PropTypes.string.isRequired || null,
        last_message: PropTypes.shape({
            content: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired
        }).isRequired || null
    }).isRequired,
    onPersonClick: PropTypes.func.isRequired,
    selectedPerson: PropTypes.number
}

export default PersonList;
