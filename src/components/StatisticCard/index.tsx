import React from "react";
import { Button } from "antd";
import { More } from "iconsax-react";
import ReactECharts from "echarts-for-react";

export enum StatisticType {
  StatisticCard1 = "StatisticCard1",
  StatisticCard2 = "StatisticCard2",
  StatisticCard3 = "StatisticCard3",
  StatisticCard4 = "StatisticCard4",
}

type Props = {
  type: StatisticType;
  icon: React.ReactElement;
  title: string;
  index: number;
  indexType: "default" | "plus" | "dollar";
  color: string;
  percent: number;
};

const data = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 20 },
  { name: "May", value: 60 },
  { name: "Jun", value: 50 },
  { name: "Jul", value: 20 },
  { name: "Aug", value: 15 },
  { name: "Sep", value: 20 },
  { name: "Oct", value: 25 },
  { name: "Nov", value: 30 },
  { name: "Dec", value: 25 },
];

const StatisticCard: React.FC<Props> = (props: Props) => {
  const { type = StatisticType.StatisticCard1, icon, title, index, color } = props;

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.name),
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: data.map((item) => item.value),
        type: "bar",
        smooth: true,
        itemStyle: {
          color: color,
          borderRadius: 3,
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false,
    },
  };

  const StatisticCard1 = () => {
    return (
      <div className="statistic-card-1">
        <div className="statistic-card-header">
          <>{icon}</>
          <p>{title}</p>
          <Button type="text" shape="circle" icon={<More />} />
        </div>
        <div className="statistic-card-body">
          <div className="statistic-card-chart">
            <ReactECharts option={option} style={{ height: "50px", width: "100%" }} />
          </div>
          <div className="statistic-card-index">
            <p>${index}</p>
          </div>
        </div>
      </div>
    );
  };

  const StatisticCard2 = () => {
    return (
      <div className="statistic-card-1">
        <p>Statistic Card 2</p>
      </div>
    );
  };

  const StatisticCard3 = () => {
    return (
      <div className="statistic-card-1">
        <p>Statistic Card 3</p>
      </div>
    );
  };

  const StatisticCard4 = () => {
    return (
      <div className="statistic-card-1">
        <p>Statistic Card 4</p>
      </div>
    );
  };

  const renderStatisticCard = () => {
    switch (type) {
      case StatisticType.StatisticCard1: {
        return <StatisticCard1 />;
      }
      case StatisticType.StatisticCard2: {
        return <StatisticCard2 />;
      }
      case StatisticType.StatisticCard3: {
        return <StatisticCard3 />;
      }
      case StatisticType.StatisticCard4: {
        return <StatisticCard4 />;
      }
      default: {
        return <StatisticCard1 />;
      }
    }
  };

  return <div className="statistic-card">{renderStatisticCard()}</div>;
};

export default StatisticCard;
