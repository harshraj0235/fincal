import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
};

const MoneyModal: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const handleNavigate = (slug: string) => {
    onClose();
    navigate(`/money/${slug}`);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10
    }}>
      <div style={{
        background: "#fff", padding: "2rem", borderRadius: "8px", minWidth: "300px", display: "flex", flexDirection: "column", gap: "1rem"
      }}>
        <h2>Add to Money</h2>
        <button onClick={() => handleNavigate("blog")}>Blog</button>
        <button onClick={() => handleNavigate("tool")}>Tool</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MoneyModal;
