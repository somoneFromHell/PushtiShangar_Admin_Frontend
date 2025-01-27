import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import axios from "axios";

const NewDashboard = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [earningsView, setEarningsView] = useState("weekly");
  const [widgetData, setWidgetData] = useState({
    totalEarnings: {
      weekly: 0,
      monthly: 0,
      yearly: 0,
    },
    totalCustomers: 0,
    totalPendingOrders: 0,
    totalReturnOrders: 0,
    totalCancelledOrders: 0,
    totalProducts: 0,
    totalShringarProducts: 0,
    totalSilverVesselsProducts: 0,
    totalSugandhiProducts: 0,
    totalPichwaiWallArtProducts: 0,
    totalVastraProducts: 0,
    totalFibreItemsProducts: 0,
    totalSeasonalProducts: 0,
  });

  const handleEarningsViewChange = (e) => {
    setEarningsView(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/dashboard/get-dashboard-data`);
        console.log(response);
        const data = response;

        setWidgetData({
          totalEarnings: {
            weekly: data.weeklyEarnings,
            monthly: data.monthlyEarnings,
            yearly: data.yearlyEarnings,
          },
          weeklyEarnings: data.weeklyEarnings,
          monthlyEarnings: data.monthlyEarnings,
          yearlyEarnings: data.yearlyEarnings,
          totalCustomers: data.customers,
          totalPendingOrders: data.orders.pendingOrders,
          totalReturnOrders: data.orders.returnOrders,
          totalCancelledOrders: data.orders.cancelledOrders,
          totalProducts: data.products.totalProducts,
          totalShringarProducts: data.products.ShringarProducts,
          totalSilverVesselsProducts: data.products.SilverVesselsProducts,
          totalSugandhiProducts: data.products.SugandhiProducts,
          totalPichwaiWallArtProducts: data.products.PichwaiAndWallArtProducts,
          totalVastraProducts: data.products.Vastra,
          totalFibreItemsProducts: data.products.FibreItems,
          totalSeasonalProducts: data.products.SeasonalProducts,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
          <Col xl={3} md={6}>
  <Card className="card-animate">
    <CardBody>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1 overflow-hidden">
          <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
            Total Earnings
          </p>
        </div>
        <div>
          <select onChange={handleEarningsViewChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div className="d-flex align-items-end justify-content-between mt-4">
        <div>
          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
            <span
              className="counter-value"
              data-target={widgetData.totalEarnings[earningsView]}
            >
              ₹
              
              <CountUp
                start={0}
                end={widgetData.totalEarnings[earningsView]}
                duration={2}
              />
            </span>
          </h4>
          <Link to="/orders" className="text-decoration-underline">
            View Details
          </Link>
        </div>
      </div>
    </CardBody>
  </Card>
</Col>

            {/* Total Customers Widget */}
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Customers
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalCustomers}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalCustomers}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/customers"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  {/* Pending Orders */}
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Pending Orders
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalPendingOrders}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalPendingOrders}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link to="/orders" className="text-decoration-underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  {/* Similar structure for other order status widgets */}
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Return Orders
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalReturnOrders}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalReturnOrders}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link to="/orders" className="text-decoration-underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Cancelled Orders */}
          </Row>
          <Row>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  {/* Similar structure for other order status widgets */}
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Cancelled Orders
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalCancelledOrders}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalCancelledOrders}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link to="/orders" className="text-decoration-underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Shringar Products
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalShringarProducts}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalShringarProducts}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/allproducts"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Silver Vessels Products
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalSilverVesselsProducts}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalSilverVesselsProducts}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/allproducts"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Sugandhi(Attar) Products
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalSugandhiProducts}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalSugandhiProducts}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/allproducts"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Pichwai & Wall Art Products
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalPichwaiWallArtProducts}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalPichwaiWallArtProducts}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/allproducts"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Vastra Products
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalVastraProducts}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalVastraProducts}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/product-categories"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Fibre Items Products
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalFibreItemsProducts}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalFibreItemsProducts}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/allproducts"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        Seasonal Products
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span
                          className="counter-value"
                          data-target={widgetData.totalSeasonalProducts}
                        >
                          <CountUp
                            start={0}
                            end={widgetData.totalSeasonalProducts}
                            duration={2}
                          />
                        </span>
                      </h4>
                      <Link
                        to="/allproducts"
                        className="text-decoration-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default NewDashboard;
