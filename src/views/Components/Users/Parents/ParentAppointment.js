import React, { Component } from "react";
import request_appointments from "./AppointmentQuery";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Badge,
  Button
} from "reactstrap";
import Loader from "../../Custom/Loader/Loader";
import { Query } from "react-apollo";
import AttendsForm from "./Attends";
import PopUp from "../../Custom/PopUp/PopUp";
import NoResults from "../../Custom/NoResults/NoResults";

export class ParentAppointment extends Component {
  render() {
    return (
      <Query
        query={request_appointments}
        variables={{ request_id: this.props.id }}
      >
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

          if (data.request.length) {
            return data.request.map(req => {
              return (
                <Table
                  style={{ textAlign: "center", fontSize: "14px" }}
                  key={req.id}
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">اليوم</th>
                      <th scope="col">من</th>
                      <th scope="col">إلى</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">اخر تعديل</th>
                      <th scope="col">تفاصيل الحضور</th>
                    </tr>
                  </thead>
                  <tbody>
                    {req.request_appointments.map(ap => {
                      return (
                        <tr key={ap.id}>
                          <td>{ap.id}</td>
                          <td>{ap.day_date}</td>
                          <td>{ap.from}</td>
                          <td>{ap.to}</td>
                          <td>
                            <Badge style={{ fontSize: "15px" }} color="warning">
                              {req.state}
                            </Badge>
                          </td>
                          <td>{getDate(ap.updated_at)}</td>
                          <td>
                            {ap.appointment_log.length ? (
                              <React.Fragment>
                                <PopUp
                                  {...{
                                    buttonLabel: "عرض التفاصيل",
                                    buttonColor: "success",
                                    body: ap.appointment_log.map(app => {
                                      return <AttendsForm data={app} />;
                                    }),
                                    footer: false
                                  }}
                                />
                              </React.Fragment>
                            ) : (
                              <Badge
                                style={{ fontSize: "15px" }}
                                color="danger"
                              >
                                لم تحضر
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              );
            });
          } else
            return (
              <div>
                {" "}
                <NoResults />
              </div>
            );
        }}
      </Query>
    );
  }
}

export default ParentAppointment;
