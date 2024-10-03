import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";
import formatTime from "../../utils/time_utils.js";

const Top = ({user}) => {
    const lastSeenTime = formatTime(user.last_seen);

    return (
        <section className='bg-white py-2 px-10 border-l-2 flex justify-between'>
            <div className='flex'>
                <div
                    className={`${user.profile_image_url === "" && "bg-light-green text-white text-xl"} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
                    {user.profile_image_url !== '' ? <img src={user.profile_image_url} alt='profile' className='w-full'/> : user.first_name[0]+user.last_name[0]}
                </div>

                <article className='ml-2 w-[280px]'>
                    <div className='flex justify-between'>
                        <h1 className='font-bold'>{`${user.first_name} ${user.last_name}`}</h1>
                    </div>

                    <div className='flex justify-between'>
                        <p className='text-gray-400 font-extralight'>last seen at {lastSeenTime}</p>
                    </div>
                </article>
            </div>

            <div className='flex mr-4 space-x-5 items-center'>
                <SearchIcon className='text-gray-400'/>
                <PhoneIcon className='text-gray-400'/>
                <MoreVertIcon className='text-gray-400' />
            </div>
        </section>
    )
}

Top.propTypes = {
    user: PropTypes.object.isRequired
}
export default Top