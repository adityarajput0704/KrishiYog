import React, { useState } from 'react'
import { GoX } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    function handleLogin() {
        navigate('/');
    }

    function handleSignup() {
        navigate('/register');
    }

    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {

        event.preventDefault();
        // Handle login logic here
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        else if (!/^[a-z]+$/.test(username)) {
            setError("Username must contain only lowercase letters");
            return;
        }


        else if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        else if (!/[a-zA-Z0-9]/.test(password)) {
            setError('Password must contain letters');
            return;
        }

        // if (!/\d/.test(password)) {
        //     setError('Password must contain at least one number');
        //     return;
        // }

        else if (!/[@#$%^&*!]/.test(password)) {
            setError("Password must contain at least one symbol");
            return;
        }

        else if (!remember) {
            setError("You must agree to terms & conditions");
            return;
        }
        else {alert("Registered successfully");}
        
    }




    return (
        <div className='flex justify-center items-center min-h-screen bg-[url("/src/assets/login_bg.jpg")] bg-cover bg-center bg-no-repeat px-4 py-8'>

            <div className= "w-full max-w-md border-gray-300 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                <button
                    className="text-3xl  sm:text-4xl text-white ml-auto block bg-transparent border-0 cursor-pointer hover:text-gray-200 transition"
                    onClick={() => {
                        handleLogin();
                    }}>
                    <GoX />
                </button>

                <h2 className='text-3xl sm:text-4xl text-white text-center my-4'>Login</h2>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col mt-3 '>

                    {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}

                    <input
                        type="username"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6' />

                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6' />

                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6'>
                        
                    <label className="flex items-center gap-2 cursor-pointer text-white text-sm">

                            <input 
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="w-4 h-4 mt-0.5 rounded cursor-pointer flex-shrink-0" />
                            <span>Remember me</span>
                    </label>

                       
                            <button className='text-sm text-white hover:text-gray-200 cursor-pointer underline'>Forgot Password?</button>
                
                        </div>



                    <button
                        type='submit'
                        className='bg-green-700 text-white p-3 rounded-lg hover:bg-green-900 
                        transition font-semibold text-base sm:text-lg mb-4'>
                        Login
                    </button>

                    <div className="text-center text-white text-sm sm:text-base">
                        <span>Don't have an account? </span>
                        <button
                            type="button"
                            className='text-blue-700 hover:text-blue-900 cursor-pointer font-semibold underline'
                            onClick={() => {
                                handleSignup();
                            }}>
                            Register
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login
