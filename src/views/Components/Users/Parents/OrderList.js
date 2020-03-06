import React, { Component } from "react";
import { Query } from "react-apollo";
import Order_list from "./Ordersquery";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import Loader from "./Loader";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ParentAppointment from "./ParentAppointment";
import parentReview, { ParentReview } from "./Review";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import ParentRev from "./ParentReview";
import NoResults from "../../Custom/NoResults/NoResults";

class OrderList extends Component {
  render() {
    return (
      <Query query={Order_list} variables={{ parent_id: this.props.parentId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <div>error</div>;

          const getDate = isoDate => {
            let date = new Date(isoDate).toLocaleString();
            date = date
              .split(",")[0]
              .split("/")
              .map(dat => (dat < 10 && "0" + dat) || dat);
            date = date[1] + "/" + date[0] + "/" + date[2];

            return date;
          };

          const cost = ind => {
            let Allappointments = data.request[ind].request_appointments.reduce(
              (total, elem) => {
                let to = new Date(elem.to).getTime();
                let from = new Date(elem.from).getTime();

                let diff = (to - from) / 1000;

                diff /= 60 * 60;
                return Math.abs(Math.round(total + diff));
              },
              0
            );
            let priceHour = data.request[ind].request_provider.hour_price;
            return Math.abs(Math.round(Allappointments * priceHour));
          };

          const WorkHour = ind => {
            let Allappointments = data.request[ind].request_appointments.reduce(
              (total, elem) => {
                let to = new Date(elem.to).getTime();
                let from = new Date(elem.from).getTime();

                let diff = (to - from) / 1000;

                diff /= 60 * 60;

                return Math.abs(Math.round(total + diff));
              },
              0
            );
            return <div>{Allappointments}ساعه</div>;
          };

          if (data.request.length) {
            return (
              <div className="animated fadeIn">
                {data.request.map((req, ind) => {
                  return (
                    <Collapse accordion={true} key={req.id}>
                      <Panel
                        header={`طلب رقم ${ind + 1}`}
                        headerClass="my-header-class"
                      >
                        <Tabs>
                          <TabList style={{ fontSize: "15px" }}>
                            <Tab>تفاصيل الطلب</Tab>
                            <Tab>المواعيد</Tab>
                            {/* <Tab>تفاصيل الحاضنه</Tab> */}
                            <Tab>المحادثه</Tab>
                            <Tab>التقييم</Tab>
                          </TabList>
                          <TabPanel>
                            <Row key={data.request.id}>
                              <Col lg={12}>
                                <Card>
                                  <CardBody>
                                    <Table>
                                      <tbody
                                        style={{
                                          fontSize: "15px"
                                        }}
                                      >
                                        <tr>
                                          <td> رقم الطلب: </td>
                                          <td>{req.id}</td>
                                        </tr>
                                        <tr>
                                          <td> تاريخ الطلب: </td>
                                          <td>{getDate(req.created_at)}</td>
                                        </tr>
                                        <tr>
                                          <td> السعر: </td>
                                          <td>
                                            {req.request_provider.hour_price}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td> نوع الحاضن: </td>
                                          <td>
                                            {
                                              req.request_provider.provider_user
                                                .userType
                                            }
                                          </td>
                                        </tr>
                                        <tr>
                                          <td> اسم الحاضنه: </td>
                                          <td>
                                            <Link
                                              to={`/providers/${req.provider_id}`}
                                            >
                                              {
                                                req.request_provider
                                                  .provider_user.name
                                              }
                                            </Link>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td> عددساعات العمل: </td>
                                          <td>{WorkHour(ind)}</td>
                                        </tr>
                                        <tr>
                                          <td> حاله الطلب: </td>
                                          <td>{req.state}</td>
                                        </tr>
                                        <tr>
                                          <td> التكلفه: </td>
                                          <td>{cost(ind).toString()}</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          </TabPanel>
                          <TabPanel>
                            <ParentAppointment id={req.id} />
                          </TabPanel>
                          {/* <TabPanel key={req.id}>
                            <ParentReview id={req.id} />
                          </TabPanel> */}
                          <TabPanel>
                            <Chat id={req.id} />
                          </TabPanel>
                          <TabPanel>
                            <ParentRev id={req.id} />
                          </TabPanel>
                        </Tabs>
                      </Panel>
                    </Collapse>
                  );
                })}
              </div>
            );
          } else
            return (
              <div>
                {" "}
                <NoResults />{" "}
              </div>
            );
        }}
      </Query>
    );
  }
}

export default OrderList;
