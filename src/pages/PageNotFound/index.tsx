import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { error404 } from "../../assets";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <img src={error404} alt="error-404" height={300} />
      <div className="content">
        <p className="title">Page Not Found</p>
        <p className="description">
          The page you are looking was moved, removed, <br /> renamed, or might never exist!
        </p>
        <Button style={{ marginTop: 16 }} type="primary" onClick={() => navigate("/")}>
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
