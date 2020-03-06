import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import Get_child from "./childquery";
import { Query } from "react-apollo";
import Loader from "./Loader";
import ModalImage from "react-modal-image";
import NoResults from "../../Custom/NoResults/NoResults";

export class ChildDetailes extends Component {
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
        query={Get_child}
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

          const childs = data.parent[0].parent_child;

          if (childs.length)
            return (
              <div className="animated fadeIn">
                {childs.map((chld, ind) => {
                  return (
                    <Row key={ind}>
                      <Col lg={12}>
                        <Card>
                          <CardHeader>
                            <img
                              src={chld.birth_certificate_image}
                              style={{
                                width: "38px",
                                height: "38px"
                              }}
                              className="img-avatar"
                              alt="admin@bootstrapmaster.com"
                              alt="pic"
                            />
                            الابن رقم {ind + 1}
                          </CardHeader>
                          <CardBody>
                            <Table>
                              <tbody
                                style={{
                                  fontSize: "15px"
                                }}
                                key={ind}
                              >
                                <tr>
                                  <td> الاسم: </td>
                                  <td>{chld.name}</td>
                                </tr>
                                <tr>
                                  <td> الصوره: </td>
                                  <td>
                                    <div style={{ maxWidth: "15%" }}>
                                      <ModalImage
                                        smallSrcSet={
                                          chld.birth_certificate_image
                                        }
                                        large={chld.birth_certificate_image}
                                        alt={chld.name}
                                      />
                                    </div>
                                  </td>
                                  {/* <td>{chld.birth_certificate_image}</td> */}
                                </tr>
                                <tr>
                                  <td> تاريخ الميلاد: </td>
                                  <td>{getDate(chld.birth_date)}</td>
                                </tr>
                                <tr>
                                  <td> تاريخ الانشاء: </td>
                                  <td>{getDate(chld.created_at)}</td>
                                </tr>
                                <tr>
                                  <td> ملاحظات: </td>
                                  <td>{chld.note}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            );
          else
            return (
              <div>
                <NoResults />
              </div>
            );
        }}
      </Query>
    );
  }
}

export default ChildDetailes;
