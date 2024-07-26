import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"

function Header() {
    const authStatus = useSelector((state) => state.auth?.isAuthenticated)
    const navigate = useNavigate()
    console.log("the auth from the header is:",authStatus)

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Sign up",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    return (
        <header className='py-3 shadow bg-transparent backdrop-blur-md  w-full'>
            <Container>
                <nav className='flex '>
                    <div className='h-12 mt-0 md:block hidden'>
                        {/* <Link to='/'>
                            <img src={logo} className='w-[200px] h-[90px]' alt="" />

                        </Link> */}
                        <h2 className='font-semibold text-2xl mt-3 '>Mega Blog</h2>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-black'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header