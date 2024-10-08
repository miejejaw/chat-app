import PropTypes from "prop-types";


const ProfilePic = ({profile_url, first_name, last_name}) => {
    return (
        <div
            className={`${!profile_url && "bg-light-green text-white text-xl"} w-[50px] h-[50px] rounded-full font-bold flex justify-center items-center`}>
            {profile_url !== '' ? (
                <img src={profile_url} alt='profile' className='w-full'/>
            ) : (
                first_name[0].toUpperCase() + last_name[0].toUpperCase()
            )}
        </div>
    )
}

ProfilePic.propTypes = {
    profile_url: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
}

export default ProfilePic;