import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth?.isAuthenticated)
    console.log("The authstatus from : home is ", authStatus)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

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
            <div className='h-screen'>
                <h1 className='mt-10 ml-10 font-bold text-black'>There as no post's as of now </h1>
            </div>
        )
    }
    return (
        <div className='w-full py-8 h-min'>
            <Container>
                <div className='flex flex-wrap md:flex-row flex-col '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/3'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home 