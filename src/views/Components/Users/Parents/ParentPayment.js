import React, { Component } from "react";
import Get_Payment from "./paymentparentquery";
import { Query } from "react-apollo";
import Loader from "./Loader";
import Error from "../../Custom/Error/Error";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import NoResults from "../../Custom/NoResults/NoResults";

export class ParentPayment extends Component {
  render() {
    return (
      <Query
        query={Get_Payment}
        variables={{ parent_id: parseInt(this.props.parentId) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;

          const payment = data.user[0].user_payment_info;

          return !payment ? (
            <div>
              <NoResults />
            </div>
          ) : (
            <div className="animated fadeIn">
              {
                <Row key={data.user.id}>
                  <Col lg={12}>
                    <Card>
                      <CardHeader>
                        <strong>
                          <i className="icon-info pr-1"></i> الدفع
                        </strong>
                      </CardHeader>
                      <CardBody>
                        <Table>
                          <tbody style={{ fontSize: "15px" }}>
                            {
                              <React.Fragment>
                                <tr>
                                  <td> # </td>
                                  <td>{payment.id}</td>
                                </tr>
                                <tr>
                                  <td> اسم المالك: </td>
                                  <td>{payment.holder_name}</td>
                                </tr>
                                <tr>
                                  <td> رقم البطافه: </td>
                                  <td>{payment.card_number}</td>
                                </tr>
                                <tr>
                                  <td> رمز التحقق: </td>
                                  <td>{payment.cvc}</td>
                                </tr>
                                <tr>
                                  <td> الشهر/السنه : </td>
                                  <td>
                                    {payment.year}/{payment.month}
                                  </td>
                                </tr>
                              </React.Fragment>
                            }
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ParentPayment;
