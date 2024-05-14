import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { Avatar, Button, Menu, MenuProps } from "antd";
import { ArrowRight2 } from "iconsax-react";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "dashboardGroup",
    label: <p className="menu-group-title">Dashboard</p>,
    type: "group",
    children: [
      {
        key: "dashboard",
        label: (
          <Link to="/" className="menu-title">
            <p>Dashboard</p>
          </Link>
        ),
      },
      {
        key: "components",
        label: (
          <Link to="/components" className="menu-title">
            <p>Components</p>
          </Link>
        ),
      },
    ],
  },
  {
    key: "managementGroup",
    label: <p className="menu-group-title">Management</p>,
    type: "group",
    children: [
      {
        key: "users",
        label: (
          <Link to="/users" className="menu-title">
            <p>Users</p>
          </Link>
        ),
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="sidebar-menu">
        <Menu mode="inline" items={items} />
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-user">
          <Avatar src="https://picsum.photos/300" size={44} />
          <div className="sidebar-footer-user-info">
            <p>Tien Nguyen</p>
            <p>Developer</p>
          </div>
        </div>
        <Button type="text" icon={<ArrowRight2 size={20} />} />
      </div>
    </div>
  );
};

export default Sidebar;
