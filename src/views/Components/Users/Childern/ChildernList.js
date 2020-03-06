import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Alert } from "reactstrap";
import Search_query from "./ChildernSearchQuery";
import { Query, Subscription } from "react-apollo";
import Loader from "../../Custom/Loader/Loader";
import Error from "../../Custom/Error/Error";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import NoResults from "../../Custom/NoResults/NoResults";

class ChildernList extends Component {
  state = {
    searchQuery: ""
  };

  handleSubmit = event => event.preventDefault();

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { state, handleSubmit, handleInputChange } = this;
    const { searchQuery } = state;

    return (
      <React.Fragment>
        <MDBCol md="9" style={{ margin: "10px auto" }}>
          <MDBFormInline className="md-form">
            <MDBIcon icon="search" />

            <input
              className="form-control form-control-lg ml-3 w-75"
              type="text"
              placeholder="Search"
              aria-label="Search"
              name="searchQuery"
              defaultValue={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for child…"
            />
          </MDBFormInline>
        </MDBCol>

        <Subscription
          subscription={Search_query}
          variables={{ searchQuery: searchQuery + "%" }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <Error />;

            const getDate = isoDate => {
              let date = new Date(isoDate).toLocaleString();
              date = date
                .split(",")[0]
                .split("/")
                .map(dat => (dat < 10 && "0" + dat) || dat);
              date = date[1] + "/" + date[0] + "/" + date[2];

              return date;
            };

            if (!data.child.length)
              return (
                <Alert color="warning">
                  <NoResults />{" "}
                </Alert>
              );

            if (data.child.length) {
              return (
                <div className="animated fadeIn">
                  {/* <ChildernSearch /> */}

                  <Row>
                    <Col xl={12}>
                      <Card>
                        <CardHeader>
                          <i className="fa fa-align-justify"></i> الابناء
                        </CardHeader>
                        <CardBody>
                          <Table
                            responsive
                            hover
                            style={{ textAlign: "center" }}
                          >
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">الصوره</th>
                                <th scope="col">الاسم</th>
                                <th scope="col">تاريخ الميلاد</th>
                                <th scope="col">تاريخ الانشاء</th>
                                <th scope="col">اخر تعديل</th>
                                <th scope="col">مذكرات</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.child.map((child, ind) => {
                                return (
                                  <tr key={child.id}>
                                    <th scope="row">
                                      <Link to={`/parents/${child.parent_id}`}>
                                        {child.id}
                                      </Link>
                                    </th>
                                    <td>
                                      <div className="avatar">
                                        <img
                                          src={child.birth_certificate_image}
                                          style={{
                                            width: "38px",
                                            height: "38px"
                                          }}
                                          className="img-avatar"
                                          alt="pic"
                                        />
                                        <span className="avatar-status badge-success"></span>
                                      </div>
                                    </td>
                                    <td>{child.name}</td>

                                    <td>{getDate(child.birth_date)}</td>
                                    <td>{getDate(child.created_at)}</td>

                                    <td>{getDate(child.updated_at)}</td>
                                    <td>{child.note}</td>

                                    <td>
                                      <button className="btn btn-success">
                                        <Link
                                          to={`/parents/${child.parent_id}`}
                                          style={{ color: "white" }}
                                        >
                                          {" "}
                                          التفاصيل{" "}
                                        </Link>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              );
            } else return <Alert color="warning">لايوجد لديه أبناء</Alert>;
          }}
        </Subscription>
      </React.Fragment>
    );
  }
}
export default ChildernList;
