import React, { useState } from 'react'
import { GoX } from "react-icons/go";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/context/auth.jsx'

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        // Validation
        if (!username || !password || !email) {
            setError('Please fill in all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // if (!/^[a-z]+$/.test(username)) {
        //     setError("Username must contain only lowercase letters");
        //     return;
        // }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (!/[a-zA-Z0-9]/.test(password)) {
            setError('Password must contain letters');
            return;
        }

        // if (!/[@#$%^&*!]/.test(password)) {
        //     setError("Password must contain at least one symbol");
        //     return;
        // }

        if (!agree) {
            setError("You must agree to terms & conditions");
            return;
        }

        // Call API
        setLoading(true);
        try {
            const result = await register({
                username,
                email,
                password,
                password2: password
            });

            if (result.success) {
                navigate('/');
            } else {
                // Handle multiple errors from backend
                if (result.errors) {
                    const errorMessages = Object.values(result.errors).flat().join(', ');
                    setError(errorMessages);
                } else {
                    setError(result.error || 'Registration failed');
                }
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-[url("/src/assets/login_bg.jpg")] bg-cover bg-center bg-no-repeat px-4 py-8'>
            <div className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl p-6 text-center sm:p-8">
                <button 
                    className="text-3xl sm:text-4xl text-white ml-auto block bg-transparent border-0 cursor-pointer hover:text-gray-200 transition"
                    onClick={() => navigate('/login')}>
                    <GoX />
                </button>

                <h2 className='text-3xl sm:text-4xl text-white text-center my-4'>Register</h2>

                <form onSubmit={handleSubmit} className='flex flex-col mt-3'>
                    {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}

                    <input
                        type="text"
                        placeholder='Username'
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6'
                        value={username}
                        disabled={loading}
                        onChange={(e) => setUsername(e.target.value)} />

                    <input
                        type="email"
                        placeholder='Email'
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6'
                        value={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)} />

                    <input
                        type="password"
                        placeholder='Password'
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6'
                        value={password}
                        disabled={loading}
                        onChange={(e) => setPassword(e.target.value)} />

                    <label className="flex items-start gap-2 mb-6 cursor-pointer text-white text-sm">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={() => setAgree(!agree)}
                            disabled={loading}
                            className="w-4 h-4 mt-0.5 rounded cursor-pointer flex-shrink-0" />
                        <span>I agree to terms & conditions</span>
                    </label>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-green-700 text-white p-3 rounded-lg hover:bg-green-900 
                        transition font-semibold text-base sm:text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <div className="text-center text-white text-sm sm:text-base">
                        <span>Already have an account? </span>
                        <button 
                            type="button" 
                            className='text-blue-600 hover:text-blue-900 cursor-pointer font-semibold underline'
                            onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register