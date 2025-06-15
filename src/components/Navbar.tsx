import React, { useState } from "react";
import MoneyModal from "./MoneyModal";

const Navbar = () => {
  const [showMoneyModal, setShowMoneyModal] = useState(false);

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <button>Blog</button>
      <button onClick={() => setShowMoneyModal(true)}>Money</button>
      {showMoneyModal && (
        <MoneyModal onClose={() => setShowMoneyModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
