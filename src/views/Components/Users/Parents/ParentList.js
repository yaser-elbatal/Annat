import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Alert } from "reactstrap";
import Get_parents from "./ParentData";
import { Query, Subscription } from "react-apollo";

import Loader from "./Loader";
import Activationbutton from "./Activationbutton";
import ModalImage from "react-modal-image";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import NoResults from "../../Custom/NoResults/NoResults";

class ParentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",

      parents: [{ isActivated: false }]
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { state, handleInputChange } = this;
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
              placeholder="بحث عن الاب"
            />
          </MDBFormInline>
        </MDBCol>

        <Subscription
          subscription={Get_parents}
          variables={{ searchQuery: searchQuery + "%" }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                  <Loader />
                </div>
              );
            if (error) return <p>error</p>;

            if (data.user.length) {
              return (
                <div className="animated fadeIn">
                  <Row>
                    <Col xl={12}>
                      <Card>
                        <CardHeader>
                          <i className="fa fa-align-justify"></i> الأباء
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
                                <th scope="col">البريد الالكتروني</th>
                                <th scope="col">الجوال</th>
                                <th scope="col">الحاله</th>
                                <th scope="col">التفاصيل</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.user.map((parent, ind) => {
                                return (
                                  <tr key={ind}>
                                    <th scope="row">
                                      <Link
                                        to={`/parents/${parent.user_parent.id}`}
                                      >
                                        {parent.user_parent.id}
                                      </Link>
                                    </th>
                                    <td>
                                      <div
                                        style={{
                                          maxWidth: "38px",
                                          borderRadius: "50em"
                                        }}
                                      >
                                        <ModalImage
                                          className="img-avatar"
                                          smallSrcSet={parent.avatar}
                                          large={parent.avatar}
                                          alt={parent.name}
                                        />
                                      </div>
                                    </td>

                                    <td>{parent.name}</td>

                                    <td>{parent.email}</td>
                                    <td>{parent.phone}</td>

                                    <td>
                                      <Activationbutton
                                        parent={{
                                          isActivated: parent.isActivated,
                                          id: parent.id
                                        }}
                                      />
                                    </td>

                                    <td>
                                      <button className="btn btn-warning">
                                        <Link
                                          to={`/parents/${parent.user_parent.id}`}
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
            } else
              return (
                <Alert color="warning">
                  <NoResults />{" "}
                </Alert>
              );
          }}
        </Subscription>
      </React.Fragment>
    );
  }
}

export default ParentList;
