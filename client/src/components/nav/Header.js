import React from "react";
import { Menu } from "antd";
import icon from "../../images/icon.png";
import "./header.css";

import { Link } from "react-router-dom";
import {
  UserOutlined,
  UserAddOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

const { Item } = Menu;

const Header = () => {
  let { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.setItem("user", null);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };

  return (
    <Menu theme="dark" mode="horizontal">
      <Item key="home" className="float-left">
        <Link to="/">
          <img src={icon} height="25" width="25" alt="home" />
        </Link>
      </Item>
      {!user && (
        <Item
          key="register"
          className="float-right"
          icon={<UserAddOutlined className="icon" />}
        >
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item
          className="float-right"
          key="login"
          icon={<UserOutlined className="icon" />}
        >
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <Item
          className="float-right"
          key="logout"
          icon={<UserOutlined className="icon" />}
          onClick={() => logout()}
        >
          <a href="/login">Logout</a>
        </Item>
      )}

      {user && user.role === "merchant" && (
        <Item key="create" icon={<ProjectOutlined />}>
          <Link to="/merchant/product">Create Product</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
