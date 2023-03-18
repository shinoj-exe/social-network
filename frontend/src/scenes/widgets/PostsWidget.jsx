import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({userId,isProfile=false}) => {
    const dispatch=useDispatch();
    const posts = useSelector((state)=>state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async()=>{
        const response = await fetch("http://localhost:3001/posts",{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`},
        })
        const data = await response.json();
        const posts = await data.reverse();
        console.log(posts);
        dispatch(setPosts({posts:posts}))
    }

    const getUserPosts = async()=>{
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`,{
            method:"GET",
            headers:{Authorization:`Bearer ${token}`},
        })
        const data = await response.json();
        const posts = await data.reverse();
        console.log(posts);
        dispatch(setPosts({posts:posts}))
    }

    useEffect(()=>{
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    },[]);
    // const revPosts= posts.reverse();

  return (
    <>
     {
        posts.map(
            ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
              })=>(
                <PostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                />
              )
        )
     }
    </>
  )
}

export default PostsWidget