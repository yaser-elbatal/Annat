import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";

export class AttendsForm extends Component {
  render() {
    const getDate = isoDate => {
      let date = new Date(isoDate).toLocaleString();
      date = date
        .split(",")[0]
        .split("/")
        .map(dat => (dat < 10 && "0" + dat) || dat);
      date = date[1] + "/" + date[0] + "/" + date[2];

      return date;
    };

    return (
      <div className="animated fadeIn">
        <Row key={this.props.data.id}>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Table responsive striped hover>
                  <tbody style={{ fontSize: "15px" }} key={this.props.data.id}>
                    {
                      <React.Fragment>
                        <tr>
                          <td scope="col">الحاله</td>
                          <td>{this.props.data.status} </td>
                        </tr>

                        <tr>
                          <td scope="col">وقت الحضور</td>
                          <td>{getDate(this.props.data.created_at)} </td>
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
  }
}

export default AttendsForm;
