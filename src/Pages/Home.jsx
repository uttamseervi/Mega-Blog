import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth?.isAuthenticated)
    // console.log("The authstatus from : home is ", authStatus)

    useEffect(() => {

        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    setTimeout(() => {
        setLoading(false)
    }, 1400)
    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen '>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap ">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (posts.length === 0) {
        return (
            <div className="flex w-52 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    }
    return (
        <div className='w-full py-8 h-min mt-24'>
            <Container>
                <div className='flex flex-wrap md:flex-row flex-col '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 md:w-1/3'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home 