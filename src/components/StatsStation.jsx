import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ILoad from "../layouts/items/iLoad";
import ISelectBox from "../layouts/items/iSelectBox";
import { ContextUser } from "../configs/ContextUser";
import { authAPI, endpoints } from "../configs/Apis";
import { ToastContainer, toast } from "react-toastify";
import IError from "../layouts/items/iError";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Thống Kê Doanh Thu",
    },
  },
};

const StatsStation = () => {
  const [user] = useContext(ContextUser);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const [listStation, setListStation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBarChart, setLoadingBarChart] = useState(false);
  const [stationIdSelect, setStationIdSelect] = useState("0");
  const [typeReport, setTypeReport] = useState("1");
  const [resultsReport, setResultsReport] = useState();

  const [labelBar, setLabelBar] = useState([]);
  const [dataBar, setDataBar] = useState([]);

  const changeFromDate = (event) => {
    setFromDate(event.target.value);
  };

  const changeToDate = (event) => {
    setToDate(event.target.value);
  };
  const handleStationChange = (event) => {
    setStationIdSelect(event.target.value);
  };
  const handleTypeReportChange = (event) => {
    setTypeReport(event.target.value);
  };
  const loadListStation = async () => {
    setLoading(true);
    if (user != null && user != undefined) {
      try {
        const data = await user.stations;
        setListStation(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (ex) {
      } finally {
        console.log("load list Station");
      }
    }
  };

  const optionsStation = listStation.map((station) => ({
    label: station.name,
    value: station.id,
  }));

  const filterDataReport = (type, data) => {
    if (type === "1") {
      const month = data.total_revenue_by_month;
      const keys = Object.keys(month);
      const values = Object.values(month);
      setLabelBar(keys);
      setDataBar(values);
    } else if (type === "2") {
      const quarter = data.total_revenue_by_quarter;
      const keys = Object.keys(quarter);
      const values = Object.values(quarter);
      setLabelBar(keys);
      setDataBar(values);
    } else if (type === "3") {
      const year = data.total_revenue_by_year;
      const keys = Object.keys(year);
      const values = Object.values(year);
      setLabelBar(keys);
      setDataBar(values);
    } else {
      return <IError err="Lỗi hệ thống. Hãy quay lại sau !!!" />;
    }
  };

  const labels = labelBar;
  const data1 = dataBar;

  let data = {
    labels,
    datasets: [
      {
        label: "Doanh Thu VNĐ",
        data: data1.map((data) => data),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => [0, 3, 5]),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  const handleReport = async () => {
    const handle = async () => {
      try {
        let uri = `${endpoints["report-revenue"](
          stationIdSelect
        )}?start_date=${fromDate}&end_date=${toDate}`;
        let res = await authAPI().get(uri);
        const data = await res.data;
        setResultsReport(data);
        setLoadingBarChart(false);

        setTimeout(() => {
          console.log("type report", typeReport);
          console.log("data report", resultsReport);
          console.log("data res", res.data);
          //   setLoadingBarChart(false);
        }, 1000);
        console.log(
          fromDate,
          toDate,
          stationIdSelect,
          "type",
          typeReport,
          "type of type",
          typeof typeReport
        );
      } catch (ex) {
        setLoadingBarChart(false);
        toast.error("Không có doanh thu theo yêu cầu trên!!");
      }
    };
    setLoadingBarChart(true);
    handle();
    //  filterDataReport(typeReport, resultsReport);
  };

  useEffect(() => {
    if (resultsReport) {
      filterDataReport(typeReport, resultsReport);
    }
  }, [resultsReport, typeReport]);

  useEffect(() => {
    loadListStation();
  }, []);

  return (
    <>
      {" "}
      <h2 className="text-center text-secondary">Báo Cáo & Thống Kê</h2>
      <Container>
        <ToastContainer />
        <Row>
          <Col md={5}>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="titleLabel">Từ Ngày: </Form.Label>
                    <Form.Control
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      type="date"
                      placeholder="name@example.com"
                      format="dd-MM-yyyy"
                      value={fromDate}
                      onChange={changeFromDate}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="titleLabel">Đến Ngày: </Form.Label>
                    <Form.Control
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      type="date"
                      placeholder="name@example.com"
                      format="dd-MM-yyyy"
                      value={toDate}
                      onChange={changeToDate}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Row>
              {loading ? (
                <ILoad />
              ) : (
                <Form.Group className="pt-4" controlId="formTo">
                  <Form.Label className="titleLabel">
                    Chọn nhà xe muốn thống kê:
                  </Form.Label>
                  <ISelectBox
                    value={stationIdSelect}
                    options={optionsStation}
                    onChange={handleStationChange}
                  />
                </Form.Group>
              )}
            </Row>
            <Row>
              <Form.Group className="pt-4" controlId="formTo">
                <Form.Label className="titleLabel">
                  Chọn loại thống kê:
                </Form.Label>
                <Form.Select
                  value={typeReport}
                  onChange={handleTypeReportChange}
                  aria-label="Default select example"
                >
                  <option value="1">Thống kê theo tháng</option>
                  <option value="2">Thống kê theo quý</option>
                  <option value="3">Thống kê theo năm</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="pt-4" controlId="formTo">
                <Button onClick={handleReport} variant="secondary">
                  Thống Kê Ngay
                </Button>
              </Form.Group>
            </Row>
          </Col>
          <Col md={7}>
            {loadingBarChart ? (
              <ILoad />
            ) : (
              <>
                {" "}
                <Bar options={options} data={data} />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StatsStation;
