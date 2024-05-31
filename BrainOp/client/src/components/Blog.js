import React from 'react';

const Blog = ({ id, isUser, title, description, imageURL, userName }) => {
  return (
    <div className="card">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700">{description}</p>
      {imageURL && <img src={imageURL} alt={title} className="w-full h-auto mt-2" />}
      <p className="text-gray-500 mt-2">Posted by: {userName}</p>
    </div>
  );
};

export default Blog;
