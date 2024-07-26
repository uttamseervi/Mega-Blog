import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {

        if (posts) {
            setPosts(posts.documents)
        }
    })
    setTimeout(() => {
        setLoading(false)
    }, 2000);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen '>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
    return (
        <div className='w-full py-8 h-min ml-0  mt-24 overflow-x-hidden'>
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

export default AllPosts