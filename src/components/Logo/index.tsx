import React from "react";
import { logo } from "../../assets";

type Props = {
  logoSize?: number;
  isHasName?: boolean;
};

const Logo: React.FC = (props: Props) => {
  const { logoSize = 50, isHasName = true } = props;
  return (
    <div className="logo">
      <img src={logo} alt="logo" height={logoSize} />
      {isHasName && <p className="logo-name">2T Dashboard</p>}
    </div>
  );
};

export default Logo;
