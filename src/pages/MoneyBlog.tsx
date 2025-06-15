import React, { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
  date: string;
};

const MoneyBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Dynamically import all blogs in the blogs folder
    const blogModules = import.meta.glob('../blogs/*.json', { eager: true });
    const importedBlogs: Blog[] = Object.values(blogModules) as Blog[];
    setBlogs(importedBlogs);
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
