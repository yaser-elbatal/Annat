import React, { Component } from "react";
import Get_parentReview from "./ParentReviewQuery";
import RatingStars from "react-rating";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import { Query } from "react-apollo";
import Loader from "../../Custom/Loader/Loader";
import NoResults from "../../Custom/NoResults/NoResults";

class ParentRev extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Query query={Get_parentReview} variables={{ request_id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                <Loader />
              </div>
            );
          if (error) return <p>error</p>;
          let tdHeadStyle = {
              width: "25%",
              textAlign: "right",
              fontWeight: "700"
            },
            tdStyle = { width: "75%", textAlign: "right" };
          if (data.request.length) {
            return data.request.map(req => {
              let rev = req.request_parent_reviews;
              return rev ? (
                <Card key={rev.id}>
                  <CardBody>
                    <Table
                      responsive
                      borderless
                      hover
                      style={{ textAlign: "center" }}
                    >
                      <tbody>
                        <tr>
                          <td style={tdHeadStyle}>تقييم ولى الأمر</td>
                          <td style={tdStyle}>
                            <RatingStars
                              emptySymbol="fa fa-star-o fa-2x"
                              fullSymbol="fa fa-star fa-2x"
                              fractions={1}
                              initialRating={rev.rate}
                              direction={"rtl"}
                              readonly={true}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              ) : (
                <div>
                  <NoResults />
                </div>
              );
            });
          } else return <div>لا يوحد تقييم</div>;
        }}
      </Query>
    );
  }
}

export default ParentRev;
