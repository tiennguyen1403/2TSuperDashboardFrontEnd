import React from "react";
import PageHeader from "../../components/PageHeader";
import { Button } from "antd";
import StatisticCard, { StatisticType } from "../../components/StatisticCard";
import { ArrowCircleDown2, Calendar, DocumentText, Like1, Wallet2 } from "iconsax-react";

const Dashboard: React.FC = () => {
  const ActionButton = () => {
    return (
      <div className="dashboard-header-actions">
        <Button size="large" type="primary">
          Set Schedule
        </Button>
        <Button size="large">Export</Button>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <PageHeader pageName="Dashboard" showBackButton actions={<ActionButton />} />
      <div className="dashboard-statistics-1">
        <StatisticCard
          type={StatisticType.StatisticCard1}
          icon={<Wallet2 color="#4680FF" />}
          title="All Earnings"
          index={30200}
          indexType="dollar"
          color="#4680FF"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard1}
          icon={<DocumentText color="#E58A00" />}
          title="Page Views"
          index={290}
          indexType="plus"
          color="#E58A00"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard1}
          icon={<Calendar color="#4CB592" />}
          title="Total Task"
          index={14568}
          indexType="default"
          color="#4CB592"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard1}
          icon={<ArrowCircleDown2 color="#E14747" />}
          title="Download"
          index={30200}
          indexType="dollar"
          color="#E14747"
          percent={30.6}
        />
      </div>
      <div className="dashboard-statistics-2">
        <StatisticCard
          type={StatisticType.StatisticCard2}
          icon={<Wallet2 color="#4680FF" />}
          title="All Earnings"
          index={346.86}
          indexType="dollar"
          color="#4680FF"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard2}
          icon={<DocumentText color="#4CB592" />}
          title="Page Views"
          index={290}
          indexType="plus"
          color="#4CB592"
          percent={-30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard2}
          icon={<Calendar color="#E58A00" />}
          title="Total Task"
          index={14568}
          indexType="default"
          color="#E58A00"
          percent={30.6}
        />
      </div>
      <div className="dashboard-statistics-3">
        <StatisticCard
          type={StatisticType.StatisticCard3}
          icon={<Wallet2 color="#4680FF" />}
          title="All Earnings"
          index={30200}
          indexType="dollar"
          color="#4680FF"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard3}
          icon={<DocumentText color="#E58A00" />}
          title="Page Views"
          index={290}
          indexType="plus"
          color="#E58A00"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard3}
          icon={<Calendar color="#4CB592" />}
          title="Total Task"
          index={14568}
          indexType="default"
          color="#4CB592"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard3}
          icon={<ArrowCircleDown2 color="#E14747" />}
          title="Download"
          index={30200}
          indexType="dollar"
          color="#E14747"
          percent={30.6}
        />
      </div>
      <div className="dashboard-statistics-4">
        <StatisticCard
          type={StatisticType.StatisticCard4}
          icon={<Wallet2 color="#4680FF" />}
          title="All Earnings"
          index={30200}
          indexType="dollar"
          color="#4680FF"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard4}
          icon={<DocumentText color="#E58A00" />}
          title="Page Views"
          index={290}
          indexType="plus"
          color="#E58A00"
          percent={30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard4}
          icon={<Calendar color="#4CB592" />}
          title="Total Task"
          index={14568}
          indexType="default"
          color="#4CB592"
          percent={-30.6}
        />
        <StatisticCard
          type={StatisticType.StatisticCard4}
          icon={<ArrowCircleDown2 color="#E14747" />}
          title="Download"
          index={30200}
          indexType="dollar"
          color="#E14747"
          percent={-30.6}
        />
      </div>
      <div className="dashboard-statistics-5">
        <StatisticCard
          type={StatisticType.StatisticCard5}
          icon={<Like1 />}
          title="Account Balance (CNY)"
          index={112893}
          indexType="dollar"
          color="#4680FF"
          percent={70.5}
        />
        <StatisticCard
          type={StatisticType.StatisticCard5}
          icon={<Like1 />}
          title="Account Balance (CNY)"
          index={112893}
          indexType="dollar"
          color="#4680FF"
          percent={70.5}
        />
        <StatisticCard
          type={StatisticType.StatisticCard5}
          icon={<Like1 />}
          title="Account Balance (CNY)"
          index={112893}
          indexType="dollar"
          color="#4680FF"
          percent={70.5}
        />
        <StatisticCard
          type={StatisticType.StatisticCard5}
          icon={<Like1 />}
          title="Account Balance (CNY)"
          index={112893}
          indexType="dollar"
          color="#4680FF"
          percent={70.5}
        />
      </div>
    </div>
  );
};

export default Dashboard;
