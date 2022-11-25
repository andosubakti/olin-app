import React from "react";
import { useNavigate } from "react-router-dom";

import { QuestionCircleOutlined } from "@ant-design/icons";

let iconOLIN = "image/olin.png";

const TopBar = () => {
  let navigate = useNavigate();

  return (
    <div
      className="Topbar"
      style={{
        zIndex: 1,
        display: "flex",
        height: 50,
        backgroundColor: "#FFF",
        borderBottom: "solid 1px",
        boxShadow: "1px 5px 10px #888888",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30,
      }}
    >
      <img
        src={iconOLIN}
        alt="Icon OLIN"
        width={50}
        height={30}
        style={{ cursor: "pointer", margin: 5 }}
        onClick={() => {
          navigate("/login");
        }}
      />

      <div style={{ display: "flex" }}>
        <QuestionCircleOutlined style={{ marginRight: 5 }} />
        <span style={{ display: "block", fontSize: 12 }}>Pusat Bantuan</span>
      </div>
    </div>
  );
};

export default TopBar;
