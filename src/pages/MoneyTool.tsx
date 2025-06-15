import React, { useState, useEffect } from "react";

type Tool = {
  id: string;
  name: string;
  description: string;
  date: string;
};

// Webpack's require.context to dynamically import all tool files
const importAllTools = (): Tool[] => {
  // @ts-ignore
  const context = require.context("../tools", false, /\.json$/);
  return context.keys().map((key: string) => context(key));
};

const MoneyTool = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    setTools(importAllTools());
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Tools</h1>
      <ul>
        {tools.map(tool => (
          <li key={tool.id} style={{ marginBottom: "1rem" }}>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <small>{tool.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoneyTool;
