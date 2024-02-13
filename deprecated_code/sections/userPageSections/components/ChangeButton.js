import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const ChangeButton = () => {
  const { company_domain } = useParams();

  return (
    <a
      href={`/${company_domain}`}
      style={{
        color: "#3361FF",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <FaAngleLeft style={{ marginLeft: "10px", marginRight: "5px" }} /> Change
    </a>
  );
};

export default ChangeButton;
