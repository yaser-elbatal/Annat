import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import Get_parentDet from "./parentDetQuery";
import { Query } from "react-apollo";
import Loader from "./Loader";

export class ParentDetailes extends Component {
  constructor(props) {
    super(props);
  }

  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map(dat => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  }
  render() {
    return (
      <Query
        query={Get_parentDet}
        variables={{ parent_id: parseInt(this.props.parentId) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <p>error</p>;

          const getDate = isoDate => {
            let date = new Date(isoDate).toLocaleString();
            date = date
              .split(",")[0]
              .split("/")
              .map(dat => (dat < 10 && "0" + dat) || dat);
            date = date[1] + "/" + date[0] + "/" + date[2];

            return date;
          };

          const parent = data.parent[0].parent_user;

          if (data.parent.length)
            return (
              <div className="animated fadeIn">
                <Row key={data.parent.id}>
                  <Col lg={12}>
                    <Card>
                      <CardHeader>
                        <img
                          src={parent.avatar}
                          style={{
                            width: "38px",
                            height: "38px"
                          }}
                          className="img-avatar"
                          alt="pic"
                        />{" "}
                        {parent.name}
                      </CardHeader>
                      <CardBody>
                        <Table responsive striped hover>
                          <tbody
                            style={{ fontSize: "15px" }}
                            key={data.parent.id}
                          >
                            {
                              <React.Fragment>
                                <tr>
                                  <td scope="col">الاسم</td>
                                  <td>{parent.name} </td>
                                </tr>

                                <tr>
                                  <td scope="col">البريد الالكتروني</td>
                                  <td>{parent.email} </td>
                                </tr>
                                <tr>
                                  <td scope="col">الجوال</td>
                                  <td>{parent.phone} </td>
                                </tr>

                                <tr>
                                  <td scope="col"> تاريخ الانشاء</td>
                                  <td>{getDate(parent.created_at)} </td>
                                </tr>
                                <tr>
                                  <td scope="col"> اخر تحديث</td>
                                  <td>{getDate(parent.updated_at)} </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      width: "25%",
                                      textAlign: "right",
                                      fontWeight: "700"
                                    }}
                                  >
                                    استكمال البيانات
                                  </td>
                                  <td
                                    style={{ width: "75%", textAlign: "right" }}
                                  >
                                    <Badge
                                      style={{ fontSize: "15px" }}
                                      color={
                                        parent.isCompleted
                                          ? "success"
                                          : "warning"
                                      }
                                    >
                                      {parent.isCompleted
                                        ? "بيانات مستكمله"
                                        : "لم يتم الاستكمال"}
                                    </Badge>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    style={{
                                      width: "25%",
                                      textAlign: "right",
                                      fontWeight: "700"
                                    }}
                                  >
                                    التفعيل
                                  </td>
                                  <td
                                    style={{ width: "75%", textAlign: "right" }}
                                  >
                                    <Badge
                                      style={{ fontSize: "15px" }}
                                      color={
                                        parent.isActivated
                                          ? "success"
                                          : "warning"
                                      }
                                    >
                                      {parent.isActivated ? "مفعل" : "غير مفعل"}
                                    </Badge>
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
              </div>
            );
          else return <div>there is no users</div>;
        }}
      </Query>
    );
  }
}

export default ParentDetailes;
