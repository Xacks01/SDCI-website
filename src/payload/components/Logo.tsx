import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="sdci-admin-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Light theme logo */}
      <img
        src="/assets/logo.png"
        alt="SDCI Logo"
        className="logo-light"
        style={{ height: "32px", width: "auto", display: "block" }}
      />
      {/* Dark theme logo */}
      <img
        src="/assets/SDCI-wht.png"
        alt="SDCI Logo"
        className="logo-dark"
        style={{ height: "32px", width: "auto", display: "none" }}
      />
    </div>
  );
};

export default Logo;
