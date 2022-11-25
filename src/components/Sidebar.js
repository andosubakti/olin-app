import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { Dropdown } from "antd";

import Auth from "../services/Auth";

import Home from "../pages/Home";
import Sales from "../pages/Sales";
import Inventory from "../pages/Inventory";
import Purchase from "../pages/Purchase";
import UserManagement from "../pages/UserManagement";

import "../App.css";

let iconOLIN = "image/olin.png";

const Sidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() => {
            Auth.logout();
          }}
          style={{ fontWeight: "bold", color: "red" }}
        >
          Logout
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (!Auth.isLogin()) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div style={{ display: "flex", width: "100%", backgroundColor: "#A3C3F2" }}>
      <div
        className="Sidebar"
        style={{
          display: "block",
          backgroundColor: "#FFF",
          minHeight: "100vh",
          height: "100%",
          position: "fixed",
          width: expandSidebar ? "300px" : "80px",
          textAlign: expandSidebar ? "left" : "center",
          transition: `width 0.5s`,
        }}
      >
        <div style={{ display: "block", marginBottom: 50 }}>
          <img
            src={iconOLIN}
            alt="Icon OLIN"
            width={50}
            height={30}
            style={{ cursor: "pointer", margin: 5 }}
            onClick={() => {
              setExpandSidebar(!expandSidebar);
            }}
          />
        </div>
        <div
          className={location.pathname === "/" ? "navlink-active" : "navlink"}
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeOutlined style={{ marginLeft: expandSidebar && 15 }} />
          {expandSidebar && (
            <span style={{ marginLeft: 20, animation: "ease-in-out 2s" }}>
              Homepage
            </span>
          )}
        </div>

        <div
          className={
            location.pathname === "/sales" ? "navlink-active" : "navlink"
          }
          onClick={() => {
            navigate("/sales");
          }}
        >
          <ShoppingOutlined style={{ marginLeft: expandSidebar && 15 }} />
          {expandSidebar && <span style={{ marginLeft: 20 }}>Sales</span>}
        </div>

        <div
          className={
            location.pathname === "/inventory" ? "navlink-active" : "navlink"
          }
          onClick={() => {
            navigate("/inventory");
          }}
        >
          <CreditCardOutlined style={{ marginLeft: expandSidebar && 15 }} />
          {expandSidebar && <span style={{ marginLeft: 20 }}>Inventory</span>}
        </div>

        <div
          className={
            location.pathname === "/purchase" ? "navlink-active" : "navlink"
          }
          onClick={() => {
            navigate("/purchase");
          }}
        >
          <ShoppingCartOutlined style={{ marginLeft: expandSidebar && 15 }} />
          {expandSidebar && <span style={{ marginLeft: 20 }}>Purchase</span>}
        </div>

        <div
          className={
            location.pathname === "/user-management"
              ? "navlink-active"
              : "navlink"
          }
          onClick={() => {
            navigate("/user-management");
          }}
        >
          <TeamOutlined style={{ marginLeft: expandSidebar && 15 }} />
          {expandSidebar && (
            <span style={{ marginLeft: 20, animation: "ease-in-out 2s" }}>
              User Management
            </span>
          )}
        </div>
      </div>

      <div style={{ width: expandSidebar ? "320px" : "80px" }}></div>

      <div
        className="Content"
        style={{
          display: "block",
          backgroundColor: "#A3C3F2",
          height: "100%",
          width: expandSidebar ? "calc(100% - 300px)" : "calc(100% - 80px)",
          margin: 20,
        }}
      >
        <div
          className="Topbar"
          style={{
            display: "flex",
            height: 50,
            backgroundColor: "#FFF",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <QuestionCircleOutlined
            style={{ marginRight: 20, cursor: "pointer" }}
          />

          <div style={{ marginRight: 20, cursor: "pointer" }}>
            <span style={{ display: "block", fontSize: 14, fontWeight: 500 }}>
              <MailOutlined />
            </span>
          </div>

          <span
            style={{
              borderRadius: "50%",
              backgroundColor: "#808080",
              height: 30,
              width: 30,
              cursor: "pointer",
            }}
          />

          <Dropdown
            menu={{ items }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <div style={{ margin: 15, cursor: "pointer" }}>
              <span style={{ display: "block", fontSize: 14, fontWeight: 500 }}>
                {sessionStorage.getItem("user")?.name || "Mr. FBS"}
              </span>
              <span style={{ display: "block", fontSize: 12 }}>
                {sessionStorage.getItem("user")?.name || "Owner"}
              </span>
            </div>
          </Dropdown>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default Sidebar;
