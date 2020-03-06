import React, { Component } from "react";
import { Query } from "react-apollo";
import Get_chat from "./ChatQuery";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Badge
} from "reactstrap";
import ImgModal from "react-modal-image";
import Loader from "../../Custom/Loader/Loader";
import NoResults from "../../Custom/NoResults/NoResults";

class Chat extends Component {
  render() {
    return (
      <Query query={Get_chat} variables={{ request_id: this.props.id }}>
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

          let tdHeadStyle = {
              width: "25%",
              textAlign: "right",
              fontWeight: "700"
            },
            tdStyle = { width: "75%", textAlign: "right" };

          if (data.request.length) {
            return data.request.map(req => {
              let chat = req.request_chat;

              if (chat.length) {
                return chat.map(cht => (
                  <Card
                    style={{ marginTop: "5px", backgroundColor: "lightyellow" }}
                    key={cht.id}
                  >
                    <CardBody>
                      <Table responsive hover style={{ textAlign: "center" }}>
                        <tbody>
                          <tr>
                            <td style={tdHeadStyle}>المرسل</td>
                            <td style={tdStyle}>
                              <b>{cht.sender}</b>
                            </td>
                          </tr>
                          <tr>
                            <td style={tdHeadStyle}>صورة</td>
                            {cht.image && (
                              <td style={tdStyle}>
                                <div style={{ maxWidth: "55px" }}>
                                  <ImgModal
                                    small={cht.image}
                                    large={cht.image}
                                    alt="الصورة"
                                  />
                                </div>
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td style={tdHeadStyle}>الرسالة</td>
                            {cht.message && (
                              <td style={tdStyle}>{cht.message}</td>
                            )}
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                    <CardFooter>
                      <div>
                        <div className="small text-muted">
                          تاريخ الرسالة {getDate(cht.created_at)}
                        </div>
                        <div className="small text-muted">
                          تاريخ آخر تعديل {getDate(cht.updated_at)}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ));
              } else
                return (
                  <div>
                    {" "}
                    <NoResults />
                  </div>
                );
            });
          } else return <div>لايوجد له طلبات</div>;
        }}
      </Query>
    );
  }
}

export default Chat;
