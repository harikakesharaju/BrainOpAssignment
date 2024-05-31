// client/src/components/Posts.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('userId'); // Retrieve token from localStorage
        const response = await axios.get('http://localhost:5000/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page // Use the page state variable
          }
        });
        setPosts(response.data.posts);
        setHasMore(response.data.hasMore);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error
      }
    };
    
    fetchPosts();
  }, [page]);
  

  const loadMorePosts = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div>
        {posts &&
          posts.map((post, index) => (
            <Blog
              key={index}
              id={post._id}
              isUser={localStorage.getItem("userId") === post.user._id}
              title={post.title}
              description={post.description}
              imageURL={post.image}
              userName={post.user.name}
            />
          ))}
      </div>
      {hasMore && (
        <button onClick={loadMorePosts} className="bg-blue-500 text-white p-2 rounded mt-4">
          Load More
        </button>
      )}
    </div>
  );
};

export default Posts;
