import React, { useState } from 'react'
import { GoX } from "react-icons/go";
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate();

    function handleLogin() {
        navigate('/login');
    }
    function handleSignup() {
        navigate('/register');
    }

    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // Handle login logic here
        if (!username || !password || !email) {
            setError('Please fill in all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!/^[a-z]+$/.test(username)) {
            setError("Username must contain only lowercase letters");
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        if (!/[a-zA-Z0-9]/.test(password)) {
            setError('Password must contain letters');
            return;
        }

        // if (!/\d/.test(password)) {
        //     setError('Password must contain at least one number');
        //     return;
        // }

        if (!/[@#$%^&*!]/.test(password)) {
            setError("Password must contain at least one symbol");
            return;
        }
        if (!agree) {
            setError("You must agree to terms & conditions");
            return;
        }


    }



    return (
        <div className='flex justify-center items-center min-h-screen bg-[url("/src/assets/login_bg.jpg")] bg-cover bg-center bg-no-repeat px-4 py-8'>

            <div className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl p-6  text-center sm:p-8">
                <button className="text-3xl sm:text-4xl text-white ml-auto block bg-transparent border-0 cursor-pointer hover:text-gray-200 transition"
                    onClick={() => {
                        handleLogin();
                    }}>
                    <GoX/>

                </button>


                <h2 className='text-3xl sm:text-4xl text-white text-center my-4'>Register</h2>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col mt-3 '>

                    {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}



                    <input
                        type="username"
                        placeholder='Username'
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />

                    <input
                        type="email"
                        placeholder='Email'
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <input
                        type="password"
                        placeholder='Password'
                        className='p-3 rounded-lg bg-transparent border-0 border-b-2 border-gray-100 
                        focus:outline-none focus:border-white text-white placeholder-gray-300 mb-6'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                  
                    <label className="flex items-start gap-2 mb-6 cursor-pointer text-white text-sm">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                className="w-4 h-4 mt-0.5 rounded cursor-pointer flex-shrink-0" />
                            <span>I agree to terms & conditions</span>
                    </label>

                    <button
                        type='submit'
                        className='bg-green-700 text-white p-3 rounded-lg hover:bg-green-900 
                        transition font-semibold text-base sm:text-lg mb-4'
                    >Register</button>

                    <div className="register">
                        <span>Already have an account?  </span>
                        <button type="button" className='text-blue-600 hover:text-blue-900 cursor-pointer font-semibold underline'
                            onClick={() => {
                                handleLogin()
                            }}>Login</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Register
