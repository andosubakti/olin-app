import React from "react";
import { Row } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

import { DummyData } from "../dummy/OrderStatisticDummy";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const data = DummyData;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //     position: 'top',
      // },
      title: {
        display: true,
        text: "23.5%",
      },
    },
  };

  const arrData = [];
  const arrLabel = [];
  data.spChart.forEach((item) => {
    arrLabel.push(item.month.slice(0, 3));
    arrData.push(item.value);
  });

  const dataChart = {
    labels: arrLabel,
    datasets: [
      {
        label: "Purchase & Sales",
        data: arrData.map((item) => item),
        backgroundColor: arrData.map((item, index) => {
          if (index + 1 < arrData.length) {
            return "#0044FF";
          } else {
            return "#FF6600";
          }
        }),
        borderRadius: "10PX",
      },
    ],
  };

  function spChart() {
    return <Bar options={options} data={dataChart} height={100} />;
  }

  const arrData2 = [];
  const arrLabel2 = [];
  const arrColor = [];
  data.penjualanObat.forEach((item) => {
    arrLabel2.push(item.label);
    arrData2.push(item.value);
    arrColor.push(item.color);
  });

  const options2 = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const dataChart2 = {
    labels: arrLabel2,
    datasets: [
      {
        // label: 'Penjualan Obat',
        data: arrData2,
        backgroundColor: arrColor,
        borderColor: "#FFF",
        borderWidth: 1,
      },
    ],
  };

  function doughnutChart() {
    return <Doughnut options={options2} data={dataChart2} height={"280%"} />;
  }

  return (
    <div style={{ height: "100%", backgroundColor: "#A3C3F2", marginTop: 20 }}>
      <Row justify="start" style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 40, fontWeight: 500, textAlign: "left" }}>
          Order Statistic
        </span>
      </Row>
      <Row justify="start" style={{ marginBottom: 20 }}>
        <div
          style={{
            height: 150,
            width: "20%",
            borderRadius: 10,
            backgroundColor: "#FFF",
            marginRight: 20,
          }}
        >
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              paddingTop: 20,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Total Selling
          </span>
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            {data.totalSelling}
          </span>
        </div>
        <div
          style={{
            height: 150,
            width: "20%",
            borderRadius: 10,
            backgroundColor: "#FFF",
            marginRight: 20,
          }}
        >
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              paddingTop: 20,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Expired Inventory
          </span>
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            {data.expiredInventory}
          </span>
        </div>
        <div
          style={{
            height: 150,
            width: "20%",
            borderRadius: 10,
            backgroundColor: "#FFF",
            marginRight: 20,
          }}
        >
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              paddingTop: 20,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Out of Stock Inventory
          </span>
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            {data.outOfStockInventory}
          </span>
        </div>
      </Row>
      <Row
        justify="start"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            height: 530,
            width: "68%",
            borderRadius: 10,
            backgroundColor: "#FFF",
          }}
        >
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              paddingTop: 10,
              fontSize: 30,
              fontWeight: 500,
            }}
          >
            Sales & Purchase
          </span>
          <span style={{ display: "block", paddingLeft: 20, paddingRight: 20 }}>
            {spChart()}
          </span>
          <span
            style={{
              display: "flex",
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div>
              <span style={{ display: "block", fontSize: 20, fontWeight: 500 }}>
                Target
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "green",
                }}
              >
                <CaretUpOutlined />
                {data.spTarget}
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 20, fontWeight: 500 }}>
                Last Week
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "red",
                }}
              >
                <CaretDownOutlined />
                {data.spLastWeek}
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 20, fontWeight: 500 }}>
                Last Month
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "green",
                }}
              >
                <CaretUpOutlined />
                {data.spLastMonth}
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 20, fontWeight: 500 }}>
                This Year
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "green",
                }}
              >
                <CaretUpOutlined />
                {data.spThisYear}
              </span>
            </div>
          </span>
        </div>
        <div style={{ width: "31%", justifyContent: "end" }}>
          <div
            style={{
              display: "flex",
              height: 170,
              borderRadius: 10,
              backgroundColor: "#FFF",
              marginBottom: 10,
              textAlign: "right",
            }}
          >
            <div
              style={{
                display: "block",
                width: "30%",
                textAlign: "center",
                marginTop: 60,
              }}
            >
              <img
                src="/image/graphic.png"
                alt="Icon Total Transaksi"
                width={50}
                height={50}
              />
            </div>
            <div style={{ width: "70%" }}>
              <span
                style={{
                  display: "block",
                  paddingRight: 20,
                  paddingTop: 40,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Total Transaksi
              </span>
              <span
                style={{
                  display: "block",
                  paddingRight: 20,
                  fontSize: 40,
                  fontWeight: 700,
                }}
              >
                {formatRupiah(data.totalTransaction)}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 170,
              borderRadius: 10,
              backgroundColor: "#FFF",
              marginBottom: 10,
              textAlign: "right",
            }}
          >
            <div
              style={{
                display: "block",
                width: "30%",
                textAlign: "center",
                marginTop: 60,
              }}
            >
              <img
                src="/image/invoice.png"
                alt="Icon Total Transaksi"
                width={50}
                height={50}
              />
            </div>
            <div style={{ width: "70%" }}>
              <span
                style={{
                  display: "block",
                  paddingRight: 20,
                  paddingTop: 40,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Sales
              </span>
              <span
                style={{
                  display: "block",
                  paddingRight: 20,
                  fontSize: 40,
                  fontWeight: 700,
                }}
              >
                {data.totalSales}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 170,
              borderRadius: 10,
              backgroundColor: "#FFF",
              textAlign: "right",
            }}
          >
            <div
              style={{
                display: "block",
                width: "30%",
                textAlign: "center",
                marginTop: 60,
              }}
            >
              <img
                src="/image/coin.png"
                alt="Icon Total Transaksi"
                width={50}
                height={50}
              />
            </div>
            <div style={{ width: "70%" }}>
              <span
                style={{
                  display: "block",
                  paddingRight: 20,
                  paddingTop: 40,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Purchase
              </span>
              <span
                style={{
                  display: "block",
                  paddingRight: 20,
                  fontSize: 40,
                  fontWeight: 700,
                }}
              >
                {data.totalPurchase}
              </span>
            </div>
          </div>
        </div>
      </Row>
      <Row
        justify="start"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            height: 350,
            width: "31%",
            borderRadius: 10,
            backgroundColor: "#FFF",
          }}
        >
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              paddingTop: 20,
              paddingBottom: 20,
              fontSize: 30,
              fontWeight: 500,
            }}
          >
            Inventory
          </span>
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              paddingRight: 20,
              textAlign: "center",
            }}
          >
            {data?.inventory &&
              data.inventory.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 20, fontWeight: 500 }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      borderRadius: 5,
                      backgroundColor: "#A3C3F2",
                      width: 30,
                      height: 30,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
          </span>
        </div>
        <div
          style={{
            height: 350,
            width: "31%",
            borderRadius: 10,
            backgroundColor: "#FFF",
          }}
        >
          <span
            style={{
              display: "block",
              paddingLeft: 20,
              paddingTop: 20,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Persentase Penjualan Obat
          </span>
          <span style={{ display: "block", paddingLeft: 20, paddingRight: 20 }}>
            {doughnutChart()}
          </span>
        </div>
      </Row>
    </div>
  );
};

export default Home;
