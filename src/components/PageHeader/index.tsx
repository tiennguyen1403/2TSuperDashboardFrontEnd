import { Button } from "antd";
import { ArrowLeft } from "iconsax-react";
import React from "react";

type Props = {
  pageName: string;
  actions?: React.ReactElement;
  showBackButton?: boolean;
  onBack?: () => void;
};

const PageHeader: React.FC<Props> = (props: Props) => {
  const { pageName, actions, onBack, showBackButton } = props;

  const handleBack = () => showBackButton && onBack && onBack();

  return (
    <div className="page-header">
      <div className="page-header-left">
        <Button onClick={handleBack} type="text" icon={<ArrowLeft />} />
        <p className="page-header-name">{pageName}</p>
      </div>
      <div className="page-header-right">{actions}</div>
    </div>
  );
};

export default PageHeader;
