import React, { Component } from "react";
import Get_Review from "./ReviewQuery";
import { Table, Badge } from "reactstrap";
import Loader from "../../Custom/Loader/Loader";
import { Query } from "react-apollo";
import ModalImage from "react-modal-image";
import NoResults from "../../Custom/NoResults/NoResults";

export class ParentReview extends Component {
  render() {
    return (
      <Query query={Get_Review} variables={{ request_id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                <Loader />
              </div>
            );
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

          const AllData = data.request;

          if (AllData.length) {
            return AllData.map(req => {
              if (req.request_parent_reviews) {
                let rev = req.request_parent_reviews.parent_reviews_provider;
                return rev ? (
                  <Table
                    key={rev.id}
                    style={{ textAlign: "center", fontSize: "14px" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">تاريخ الانشاء</th>
                        <th scope="col">الاستضافه في المنزل</th>
                        <th scope="col">سعر الساعه</th>
                        <th scope="col">تفاصصيل الموقع</th>
                        <th scope="col">عامله</th>
                        <th scope="col">اقصي سن للطفل للقبول</th>

                        <th scope="col">اقصي عدد اطفال </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        <tr key={rev.id}>
                          <td>{getDate(rev.created_at)}</td>
                          <td>
                            <Badge
                              style={{ fontSize: "15px" }}
                              color={rev.go_to_client ? "success" : "warning"}
                            >
                              {rev.go_to_client ? "نعم" : " لا"}
                            </Badge>
                          </td>
                          <td>{rev.hour_price}</td>
                          <td>{rev.location_description}</td>

                          <td>
                            <Badge
                              style={{ fontSize: "15px" }}
                              color={rev.isWorking ? "success" : "warning"}
                            >
                              {rev.isWorking ? "نعم" : " لا"}
                            </Badge>
                          </td>
                          <td>{rev.maxAge} سنين</td>
                          <td>{rev.maxCount}</td>
                        </tr>
                      }
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    <NoResults />
                  </div>
                );
              } else return <div>لايوجد له ملاحظات</div>;
            });
          } else return <div>لايوجد له ملاحظات</div>;
        }}
      </Query>
    );
  }
}

export default ParentReview;
