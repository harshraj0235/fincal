import React, { useState } from "react";
import MoneyModal from "./MoneyModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMoneyModal, setShowMoneyModal] = useState(false);

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/blog">Blog</Link>
      <Link to="/crypto">Crypto</Link>
      <button onClick={() => setShowMoneyModal(true)}>Money</button>
      {showMoneyModal && (
        <MoneyModal onClose={() => setShowMoneyModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
