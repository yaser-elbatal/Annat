import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { Subscription } from "react-apollo";
import { List_Providers } from "../../../../services/queries/Providers";
import Loader from "../../Custom/Loader/Loader";
import Error from "../../Custom/Error/Error";
import NoResults from "../../Custom/NoResults/NoResults";
import Tabs from "../../Custom/Tabs/Tabs";
import ActivationProvider from "./ActivationProvider";
import queryString from "querystring"

class ListProviders extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() { }

  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map(dat => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  }

  ProviderRow(props) {
    const provider = props.provider;
    const providerLink = `/providers/${provider.provider_id}`;

    return (
      <tr key={provider.provider_id.toString()}>
        <th scope="row">{provider.provider_id}</th>
        <td>
          <div>
            <div className="avatar">
              <img
                src={provider.avatar}
                style={{ width: "36px", height: "36px" }}
                className="img-avatar"
              />
              <span
                className={`avatar-status badge-${
                  provider.isActivated ? "primary" : "danger"
                  }`}
              ></span>
            </div>
            {/* <ToolTip
              containerBodyElmStyle={{ borderRadius: "50%" }}
              clickableElm={
                <div className="avatar">
                  <img src={provider.avatar} style={{ width: "36px", height: "36px" }} className="img-avatar" />
                  <span className={`avatar-status badge-${provider.isActivated ? "primary" : "danger"}`}></span>
                </div>
              }

              bodyElm={
                <img src={provider.avatar} style={{ width: "200px", height: "200px" }} className="img-avatar" />
              }

            /> */}
          </div>
        </td>
        <td>
          <div style={{ fontWeight: "500" }}>{provider.name}</div>
          <div className="small text-muted">
            التسجيل : {new ListProviders().getDate(provider.created_at)} |{" "}
            {provider.isCompleted ? "مكتمل" : "غير مكتمل"}
          </div>
        </td>
        <td>{provider.email}</td>
        <td>{provider.phone}</td>
        <td>{`${provider.user_provider.provider_area.area_city.name_ar} / ${provider.user_provider.provider_area.name_ar}`}</td>
        <ActivationProvider
          id={provider.id}
          isActivated={provider.isActivated}
        />
        <td>
          <Link className="btn btn-success" to={providerLink}>
            عرض
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Subscription subscription={List_Providers}>
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <Error />;

                if (data.user.length) {
                  let sitterTab = (
                    <div>
                      <Card>
                        <CardHeader>
                          <span style={{ fontSize: "20px" }}>
                            <i className="fa fa-users"></i>
                          </span>{" "}
                          <b>عرض الحاضنات</b>
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
                                <th scope="col">الصورة الشخصية</th>
                                <th scope="col">الاسم</th>
                                <th scope="col">البريد الإلكترونى</th>
                                <th scope="col">رقم الجوال</th>
                                <th scope="col">الموقع</th>
                                <th scope="col">التفعيل</th>
                                <th scope="col">التفاصيل</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.user.map((pr, index) => {
                                if (pr.userType == "sitter")
                                  return (
                                    <this.ProviderRow
                                      key={index}
                                      provider={pr}
                                    />
                                  );
                              })}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </div>
                  );

                  let organizationTab = (
                    <div>
                      <Card>
                        <CardHeader>
                          <span style={{ fontSize: "20px" }}>
                            <i className="fa fa-building-o"></i>
                          </span>{" "}
                          <b>عرض مراكز الرعاية</b>
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
                                <th scope="col">الصورة الشخصية</th>
                                <th scope="col">الاسم</th>
                                <th scope="col">البريد الإلكترونى</th>
                                <th scope="col">رقم الجوال</th>
                                <th scope="col">الموقع</th>
                                <th scope="col">التفعيل</th>
                                <th scope="col">التفاصيل</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.user.map((pr, index) => {
                                if (pr.userType == "organization")
                                  return (
                                    <this.ProviderRow
                                      key={index}
                                      provider={pr}
                                    />
                                  );
                              })}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </div>
                  );

                  let dataTabs = [
                    {
                      label: <b>الحاضنات</b>,
                      body: !data.user.find(u => u.userType == "sitter") ?
                        (<NoResults />) : (sitterTab)
                    },
                    {
                      label: <b>مراكز الرعاية</b>,
                      body: !data.user.find(u => u.userType == "organization") ?
                        (<NoResults />) : (organizationTab)
                    }
                  ];

                  // if url have 'org' as a queryString it open default tab of organization
                  let org = Object.keys(JSON.parse(
                    JSON.stringify(
                      queryString.parse(
                        this.props.location.search
                      )).replace(`{"?`, `{"`)
                  )).includes("org") ? "1" : "0"

                  return <Tabs data={dataTabs} selectedTabIndex={org} />;
                } else
                  return (
                    <div>
                      <NoResults />
                    </div>
                  );
              }}
            </Subscription>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListProviders;
