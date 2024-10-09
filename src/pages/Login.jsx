import {useState} from "react";
import { login } from '../features/auth/authThunks';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (username === '' || password === '') {
            setError('Please fill in all fields');
            setLoading(false); // Reset loading state
            return;
        }

        try {
            // Await the dispatch to handle the promise correctly
            await dispatch(login(username, password));
            navigate('/chat');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false); // Ensure loading state is reset regardless of success or failure
        }
    };

    return (
        <div className="flex w-full h-full">
            {/* Left Section */}
            <div className="w-2/3 flex items-center relative">
                <div className="bg-white ml-32 p-8 rounded-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back!</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                             role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 mb-2">Username:</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-light-purple"
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-light-purple"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-dark-purple text-white rounded-md hover:bg-light-purple transition duration-200 outline-none"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account? <a href="/signup" className="text-dark-purple font-semibold">Register</a>
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

            {/* Right Section */}
            <div className="flex-1 bg-light-purple">
            </div>

            <img src='/login-pic.svg' alt="Login" className="absolute right-40 object-cover" />
        </div>
    );
};

export default Login;
