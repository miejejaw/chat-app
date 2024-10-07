import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CustomInputField from "../components/CustomInputField.jsx";
import {registerUserApi} from "../features/user/userApi.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const Signup = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        setLoading(true);
        setApiError(null);  // Reset error state before new submission

        try {
            const response = await registerUserApi({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                username: data.username,
                password: data.password,
            });
            console.log("User registered successfully: ", response);
            navigate('/login');
        } catch (error) {
            // Handle API error response
            if (error.response && error.response.data) {
                // Capture error message from API response
                setApiError(error.response.data.message || "Something went wrong. Please try again.");
            } else {
                // Handle general network errors
                setApiError("Failed to register. Please check your network connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-full">
            {/* Left Section */}
            <div className="flex-1 flex justify-center">
                <div className=''>
                    <img src='/register-pic.svg' alt="Login" className="flex relative h-3/4"/>
                    <img src='/signup-pic.svg' alt="Signup" className="absolute bottom-0 right-1/2 object-cover"/>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 items-center pt-8">
                <div className="bg-white ml-32 p-8 rounded-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Please Fill out the form to Register!</h2>

                    {/* Display API Error Message */}
                    {apiError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                             role="alert">
                            <span className="block sm:inline">{apiError}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <CustomInputField
                            label="First Name"
                            type="text"
                            placeholder="Please enter your first name"
                            register={register("first_name")}
                            errors={errors.first_name}
                        />

                        <CustomInputField
                            label="Last Name"
                            type="text"
                            placeholder="Please enter your last name"
                            register={register("last_name")}
                            errors={errors.last_name}
                        />

                        <CustomInputField
                            label="Email"
                            type="text"
                            placeholder="Please enter your email"
                            register={register("email")}
                            errors={errors.email}
                        />

                        <CustomInputField
                            label="Username"
                            type="text"
                            placeholder="Please enter your username"
                            register={register("username")}
                            errors={errors.username}
                        />

                        <CustomInputField
                            label="Password"
                            type="password"
                            placeholder="Please enter your password"
                            register={register("password")}
                            errors={errors.password}
                        />

                        <CustomInputField
                            label="Confirm Password"
                            type="password"
                            placeholder="Please confirm your password"
                            register={register("confirm_password")}
                            errors={errors.confirm_password}
                        />

                        <button
                            type="submit"
                            className={`w-full mt-3 py-2 bg-dark-purple text-white rounded-3xl hover:bg-light-purple transition duration-200 ${isSubmitting || loading ? 'cursor-not-allowed' : ''}`}
                            disabled={isSubmitting || loading}
                        >
                            {loading ? "Registering..." : "Register"}
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
