import React, { useState, useEffect } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
  date: string;
};

// Webpack's require.context to dynamically import all blog files
const importAllBlogs = (): Blog[] => {
  // @ts-ignore
  const context = require.context("../blogs", false, /\.json$/);
  return context.keys().map((key: string) => context(key));
};

const MoneyBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(importAllBlogs());
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Blogs</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id} style={{ marginBottom: "1rem" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <small>{blog.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoneyBlog;
