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
        <div className='login flex justify-center items-center h-screen bg-[url("/src/assets/login_bg.jpg")] bg-cover bg-center bg-no-repeat h-full w-full'>

            <div className="box border-1 border-gray-300  w-80  backdrop-blur-xs bg-white/20 border border-white/30 rounded-2xl shadow-xl p-6 w-96 text-center">
                <button
                    className="text-4xl text-white ml-auto mb-2 bg-transparent border-0 cursor-pointer"
                    onClick={() => {
                        handleLogin();
                    }}>
                    <GoX className='ml-76' />
                </button>

                <h2 className='text-4xl text-white m-4'>Login</h2>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col mt-3 '>

                    {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

                    <input
                        type="username"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='p-2 rounded-lg border-0 border-b-2 border-gray-100 focus:outline-none py-2 m-4 mb-6 text-white' />

                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='p-2 rounded-lg border-0 border-b-2 border-gray-100 focus:outline-none py-2 m-4 mb-0 text-white' />

                    <label className="flex items-center justify-between cursor-pointer mt-2 m-4 mb-4">
                        
                        <div className='flex items-center gap-2 cursor-pointer'>

                            <input 
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="w-4 h-4 border-1 rounded-sm  bg-white" />
                            <span className='text-sm'>Remember me</span>
                        </div>

                        <div className="forgotpw ">
                            <button className='text-sm cursor-pointer'>Forgot Password?</button>
                        </div>

                    </label>


                    <button
                        type='submit'
                        className='bg-green-700 text-white p-2 rounded-lg hover:bg-green-900 m-4'>
                        Login
                    </button>

                    <div className="register">
                        <span>Don't have an account? </span>
                        <button
                            type="button"
                            className='cursor-pointer hover:text-blue-700'
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
