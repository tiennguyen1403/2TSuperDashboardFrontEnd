import { Button } from "antd";
import { HambergerMenu } from "iconsax-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="header">
      <Button type="text">
        <HambergerMenu />
      </Button>
    </div>
  );
};

export default Header;
