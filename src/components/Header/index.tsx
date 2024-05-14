import { Avatar, Button, Dropdown, Flex, Input, Menu, MenuProps, Tabs, TabsProps } from "antd";
import {
  Card,
  Clipboard,
  Edit2,
  HambergerMenu,
  I24Support,
  LanguageSquare,
  Lock1,
  Logout,
  Maximize1,
  Messages1,
  NotificationBing,
  NotificationStatus,
  Profile2User,
  Setting2,
  User,
} from "iconsax-react";
import React from "react";
import useAuthStore from "../../store/useAuth";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

type UserMenuProp = {
  onSignOut: () => void;
};

const profileMenuItems: MenuItem[] = [
  {
    key: "edit",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <Edit2 size={20} variant="Bulk" />
        <p>Edit Profile</p>
      </Flex>
    ),
  },
  {
    key: "view",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <User size={20} variant="Bulk" />
        <p>View Profile</p>
      </Flex>
    ),
  },
  {
    key: "social",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <Profile2User size={20} variant="Bulk" />
        <p>Social Profile</p>
      </Flex>
    ),
  },
  {
    key: "billing",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <Card size={20} variant="Bulk" />
        <p>Billing</p>
      </Flex>
    ),
  },
  {
    key: "logout",
    className: "danger",
    label: (
      <Flex align="center" gap={8} className="menu-title danger">
        <Logout size={20} variant="Bulk" />
        <p>Logout</p>
      </Flex>
    ),
  },
];

const settingMenuItems: MenuItem[] = [
  {
    key: "support",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <I24Support size={20} variant="Bulk" />
        <p>Support</p>
      </Flex>
    ),
  },
  {
    key: "account-settings",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <User size={20} variant="Bulk" />
        <p>Account Settings</p>
      </Flex>
    ),
  },
  {
    key: "privacy-center",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <Lock1 size={20} variant="Bulk" />
        <p>Privacy Center</p>
      </Flex>
    ),
  },
  {
    key: "feedback",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <Messages1 size={20} variant="Bulk" />
        <p>Feedback</p>
      </Flex>
    ),
  },
  {
    key: "history",
    label: (
      <Flex align="center" gap={8} className="menu-title">
        <Clipboard size={20} variant="Bulk" />
        <p>History</p>
      </Flex>
    ),
  },
];

const generateTabItems = (onSignOut: () => void): TabsProps["items"] => {
  return [
    {
      key: "profile",
      label: "Profile",
      icon: <User size={20} />,
      children: (
        <Menu
          mode="inline"
          items={profileMenuItems}
          onClick={({ key }) => key === "logout" && onSignOut()}
        />
      ),
    },
    {
      key: "setting",
      label: "Setting",
      icon: <Setting2 size={20} />,
      children: <Menu mode="inline" items={settingMenuItems} />,
    },
  ];
};

const UserMenu: React.FC<UserMenuProp> = (props: UserMenuProp) => {
  const { onSignOut } = props;
  return (
    <div>
      <div className="header-user-heading">
        <Avatar className="header-user" src="https://picsum.photos/300" size={40} />
        <div className="header-user-heading-info">
          <span>Tien Nguyen</span>
          <span>Developer</span>
        </div>
        <Button
          danger
          type="text"
          size="large"
          onClick={onSignOut}
          icon={<Logout variant="Bulk" />}
        />
      </div>
      <Tabs items={generateTabItems(onSignOut)} centered />
    </div>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { signOut }: any = useAuthStore();

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <div className="header">
      <div className="header-left">
        <Button size="large" type="text" icon={<HambergerMenu />} />
        <Input.Search size="large" placeholder="Search everything ..." />
      </div>
      <div className="header-right">
        <Button size="large" type="text" icon={<LanguageSquare variant="Bulk" />} />
        <Button size="large" type="text" icon={<NotificationBing variant="Bulk" />} />
        <Button size="large" type="text" icon={<Maximize1 variant="Bulk" />} />
        <Button size="large" type="text" icon={<NotificationStatus variant="Bulk" />} />
        <Dropdown
          trigger={["click"]}
          dropdownRender={() => <UserMenu onSignOut={handleSignOut} />}
          overlayClassName="header-user-container"
        >
          <Avatar className="header-user" src="https://picsum.photos/300" size={40} />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
