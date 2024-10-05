import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";
import formatTime from "../../utils/time_utils.js";

const Top = ({ person }) => {
    const lastSeenTime = formatTime(person.last_seen);
    return (
        <section className='bg-white py-2 px-10 border-l-2 flex justify-between'>
            <div className='flex'>
                <div
                    className={`${person.profile.profile_image_url === "" && "bg-light-green text-white text-xl"} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                    {person.profile.profile_image_url !== '' ? (
                        <img src={person.profile.profile_image_url} alt='profile' className='w-full' />
                    ) : (
                        person.profile.first_name[0] + person.profile.last_name[0]
                    )}
                </div>

                <article className='ml-2 w-[280px]'>
                    <div className='flex justify-between'>
                        <h1 className='font-bold'>{`${person.profile.first_name} ${person.profile.last_name}`}</h1>
                    </div>

                    <div className='flex justify-between'>
                        <p className='text-gray-400 font-extralight'>last seen at {lastSeenTime}</p>
                    </div>
                </article>
            </div>

            <div className='flex mr-4 space-x-5 items-center'>
                <SearchIcon className='text-gray-400' />
                <PhoneIcon className='text-gray-400' />
                <MoreVertIcon className='text-gray-400' />
            </div>
        </section>
    )
}

Top.propTypes = {
    person: PropTypes.shape({
        profile: PropTypes.shape({
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
            profile_image_url: PropTypes.string.isRequired
        }).isRequired,
        last_seen: PropTypes.string.isRequired
    }).isRequired
}

export default Top;
