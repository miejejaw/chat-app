import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CustomInputField from "../components/CustomInputField.jsx";


const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log("Form Data Submitted: ", data);
    };

    return (
        <div className="flex w-full h-full">
            {/* Left Section */}
            <div className="flex-1 flex justify-center">
                <div className=''>
                    <img src='/register-pic.svg' alt="Login" className="flex relative h-3/4"/>
                    <img src='/signup-pic.svg' alt="Login" className="absolute bottom-0 right-1/2 object-cover"/>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 items-center pt-8">
                <div className="bg-white ml-32 p-8 rounded-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Please Fill out form to Register!</h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInputField
                            label='Full Name'
                            type='text'
                            placeholder='Please enter your full name'
                            register={register}
                            errors={errors.full_name}
                        />

                        <CustomInputField
                            label='Email'
                            type='email'
                            placeholder='Please enter your email'
                            register={register}
                            errors={errors.email}
                        />

                        <CustomInputField
                            label='Username'
                            type='text'
                            placeholder='Please enter your username'
                            register={register}
                            errors={errors.username}
                        />

                        <CustomInputField
                            label='Password'
                            type='password'
                            placeholder='Please enter your password'
                            register={register}
                            errors={errors.password}
                        />

                        <CustomInputField
                            label='Confirm Password'
                            type='password'
                            placeholder='Please confirm your password'
                            register={register}
                            errors={errors.confirm_password}
                        />

                        <button
                            type="submit"
                            className="w-full mt-3 py-2 bg-dark-purple text-white rounded-3xl hover:bg-light-purple transition duration-200"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-4 text-center text-gray-600">
                        I have an account? <a href="#" className="text-dark-purple font-semibold">Login</a>
                    </p>

                    <div className="flex justify-center mt-4">
                        <a href="#" className="mx-2">
                            <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook"
                                 className="w-6 h-6"/>
                        </a>
                        <a href="#" className="mx-2">
                            <img src="https://img.icons8.com/ios-filled/50/000000/whatsapp.png" alt="WhatsApp"
                                 className="w-6 h-6"/>
                        </a>
                        <a href="#" className="mx-2">
                            <img src="https://img.icons8.com/ios-filled/50/000000/telegram-app.png" alt="Telegram"
                                 className="w-6 h-6"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
