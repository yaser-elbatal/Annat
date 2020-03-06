import React, { Component } from "react";
import Getpocket from "./PocketQuery";
import NoResults from "../../Custom/NoResults/NoResults";
import Loader from "./Loader";
import { Query } from "react-apollo";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import BocketAction from "./BocketAction";
import Error from "../../Custom/Error/Error";

export default class ParentPocket extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={Getpocket} variables={{ parent_id: this.props.parentId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) {
            return <Error />;
          }

          if (data.parent.length) {
            const getDate = isoDate => {
              let date = new Date(isoDate).toLocaleString();
              date = date
                .split(",")[0]
                .split("/")
                .map(dat => (dat < 10 && "0" + dat) || dat);
              date = date[1] + "/" + date[0] + "/" + date[2];

              return date;
            };

            return data.parent.map(boket =>
              !boket.parent_user ? (
                <NoResults />
              ) : (
                boket.parent_user.user_bocket_transactions.map(bocket => (
                  <Row key={bocket.id}>
                    <Col lg={12}>
                      <Card style={{ backgroundColor: "lightyellow" }}>
                        <CardBody>
                          <Table responsive hover>
                            <tbody style={{ fontSize: "15px" }}>
                              {
                                <React.Fragment>
                                  <tr>
                                    <td scope="col">العمليه</td>
                                    <td style={{ fontSize: "25px" }}>
                                      {<BocketAction action={bocket.action} />}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td scope="col">المبلغ</td>
                                    <td>{bocket.amount} </td>
                                  </tr>

                                  <tr>
                                    <td scope="col"> تاريخ العمليه</td>
                                    <td>{getDate(bocket.created_at)} </td>
                                  </tr>
                                </React.Fragment>
                              }
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                ))
              )
            );
          } else return <NoResults />;
        }}
      </Query>
    );
  }
}
