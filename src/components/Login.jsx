import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm()
    /* here in the above handleSubmit is not only the method it is a keyword we cannot directly use this to handle onSubmit instead we need to give it as handleSubmit(methodName) the methodName here is login so we give it like handleSubmit(login) "things to remember"*/
    const [error, setError] = useState('')

    const login = async (data) => {
        // the data here is coming from  what we have spread in the register so remember this

        setError("")
        try {
            const session = await authService.login(data);
            console.log("the session from the login is: ", session)
            if (session) {
                const userData = await authService.getCurrentUser()
                console.log("The user data is: ", userData)
                dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }




    return (
        <div
            className='flex items-center justify-center w-full h-screen '
        >
            <div className={`mx-auto w-full max-w-lg bg-transparent rounded-xl backdrop-blur-lg  p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='300px' />
                    </span>
                </div>
                <h2 className='text-2xl text-center font-bold leading-tight'>Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
                {/* above the comment is written for the below syntax we are using react-forms */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your Email"
                            type="email"
                            // {...register} 
                            /*The above line is the syntax for using the react from if we dont write this agar kisi or input me bhi ye register use karte hai to uski value overWrite hojayegi
                            hame isko spread karna padega agar nhi kiya to like ham kisi or input me bhi register use karte hai to uski value overWrite hojati hai
                            */
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your Password"
                            type="password"
                            {...register("password", {
                                required: true,
                                // maxLength: 8,
                            })}
                        />
                        <Button type="submit" className='w-full' >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
