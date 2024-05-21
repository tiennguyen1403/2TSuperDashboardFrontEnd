import React from "react";
import { Badge, Button, Flex, Statistic } from "antd";
import { Add, ArrowUp, ArrowUp2, Minus, More } from "iconsax-react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export enum StatisticType {
  StatisticCard1 = "StatisticCard1",
  StatisticCard2 = "StatisticCard2",
  StatisticCard3 = "StatisticCard3",
  StatisticCard4 = "StatisticCard4",
  StatisticCard5 = "StatisticCard5",
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

const barChartData = [
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

const lineChartData = [
  { name: "Mon", value: 10 },
  { name: "Tue", value: 25 },
  { name: "Wed", value: 3 },
  { name: "Thu", value: 10 },
  { name: "Fri", value: 4 },
  { name: "Sat", value: 50 },
  { name: "Sun", value: 0 },
];

const StatisticCard: React.FC<Props> = (props: Props) => {
  const {
    type = StatisticType.StatisticCard1,
    icon,
    title,
    index,
    color,
    percent,
    indexType,
  } = props;

  const barChartOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: barChartData.map((item) => item.name),
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: barChartData.map((item) => item.value),
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

  const lineChartOption = {
    xAxis: {
      type: "category",
      data: lineChartData.map((item) => item.name),
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: lineChartData.map((item) => item.value),
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          color,
          width: 2,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color,
            },
            {
              offset: 1,
              color: "rgba(255, 255, 255, 0)",
            },
          ]),
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
    tooltip: {
      trigger: "axis",
    },
  };

  const iconStyle = {
    padding: 8,
    borderRadius: 8,
  };

  //#region card 1
  const StatisticCard1 = () => {
    return (
      <div className="statistic-card-1">
        <div className="statistic-card-header">
          <div style={iconStyle}>{icon}</div>
          <p>{title}</p>
          <Button
            type="text"
            shape="circle"
            icon={<More style={{ transform: "rotate(90deg)" }} />}
          />
        </div>
        <Flex className="statistic-card-body" gap="middle">
          <div className="statistic-card-chart">
            <ReactECharts option={barChartOption} style={{ height: "80px", width: "100%" }} />
          </div>
          <div className="statistic-card-index">
            <p>
              {indexType === "dollar" && <span>$</span>}
              <span>{index}</span>
              {indexType === "plus" && <span>+</span>}
            </p>
            <p style={{ color }}>
              <ArrowUp style={{ transform: "rotate(45deg)" }} color={color} />
              <>{percent}%</>
            </p>
          </div>
        </Flex>
      </div>
    );
  };
  //#endregion card 1

  //#region card 2
  const StatisticCard2 = () => {
    return (
      <div className="statistic-card-2">
        <div className="statistic-card-header">
          <div className="statistic-card-symbol">{icon}</div>
          <p
            className="statistic-card-percent"
            style={{ color: percent < 0 ? "#DC2626" : "#15D28E" }}
          >
            <ArrowUp
              style={{ transform: percent < 0 ? "rotate(-135deg)" : "rotate(45deg)" }}
              color={percent < 0 ? "#DC2626" : "#15D28E"}
            />
            <>{Math.abs(percent)}%</>
          </p>
        </div>
        <Flex className="statistic-card-body">
          <Flex vertical gap="small" className="statistic-card-info">
            <p className="statistic-card-title">{title}</p>
            <p className="statistic-card-index">
              {indexType === "dollar" && <span>$</span>}
              <span>{index}</span>
              {indexType === "plus" && <span>+</span>}
            </p>
          </Flex>
          <div className="statistic-card-chart">
            <ReactECharts option={lineChartOption} style={{ height: "80px", width: "100%" }} />
          </div>
        </Flex>
      </div>
    );
  };
  //#endregion card 2

  //#region card 3
  const StatisticCard3 = () => {
    return (
      <div className="statistic-card-3">
        <Flex className="statistic-card-body" gap="middle">
          <div className="statistic-card-symbol">{icon}</div>
          <Flex gap="small" vertical justify="space-between" className="statistic-card-info">
            <p>{title}</p>
            <p>
              {indexType === "dollar" && <span>$</span>}
              <span>{index}</span>
              {indexType === "plus" && <span>+</span>}
            </p>
          </Flex>
          <p className="statistic-card-percent" style={{ color }}>
            {percent}%
          </p>
        </Flex>
      </div>
    );
  };
  //#endregion card 3

  //#region card 4
  const StatisticCard4 = () => {
    return (
      <div className="statistic-card-4">
        <Flex className="statistic-card-header" align="center" gap="middle">
          <div style={iconStyle}>{icon}</div>
          <p>{title}</p>
        </Flex>
        <Flex className="statistic-card-body">
          <div className="statistic-card-chart">
            <ReactECharts option={barChartOption} style={{ height: "80px", width: "100%" }} />
          </div>
          <div className="statistic-card-index">
            <p>
              {indexType === "dollar" && <span>$</span>}
              <span>{index}</span>
              {indexType === "plus" && <span>+</span>}
            </p>
            <p style={{ color }}>
              {percent > 0 ? <Add size={20} color={color} /> : <Minus size={20} color={color} />}
              <>{Math.abs(percent)}%</>
            </p>
          </div>
        </Flex>
      </div>
    );
  };
  //#endregion card 4

  //#region card 5
  const StatisticCard5 = () => {
    return (
      <div className="statistic-card-5">
        <Statistic
          title={
            <Flex gap="small" align="center">
              <Badge status="error" />
              <span style={{ fontSize: 16 }}>{title}</span>
            </Flex>
          }
          value={index}
          precision={2}
          prefix={icon}
        />
        <Flex justify="space-between" align="center" className="statistic-card-footer">
          <p style={{ fontWeight: 600, fontSize: 16 }}>trend title</p>
          <Flex align="center">
            <ArrowUp2 variant="Bold" color="#2CA87F" />
            <span className="statistic-card-percent">{percent}%</span>
          </Flex>
        </Flex>
      </div>
    );
  };
  //#endregion card 5

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
      case StatisticType.StatisticCard5: {
        return <StatisticCard5 />;
      }
      default: {
        return <StatisticCard1 />;
      }
    }
  };

  return <div className="statistic-card">{renderStatisticCard()}</div>;
};

export default StatisticCard;
