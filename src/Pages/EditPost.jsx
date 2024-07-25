import React, { useEffect, useState } from 'react'
import { Container, PostCard, PostForm } from "../components"
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/config"

const EditPost = () => {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post)
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])


    return (
        <div>{
            post ? (
                <div>
                    <Container>
                        <PostForm post={post} />
                    </Container>
                </div>
            ) : null
        }
        </div>
    )
}

export default EditPost
