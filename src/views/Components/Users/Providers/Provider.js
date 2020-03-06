import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import { Query } from "react-apollo";
import { Get_Provider } from "../../../../services/queries/Providers";
import Loader from "../../Custom/Loader/Loader";
import Error from "../../Custom/Error/Error";
import NoResults from "../../Custom/NoResults/NoResults";
import Tabs from "../../Custom/Tabs/Tabs";
import Accordion from "../../Custom/Accordion/Accordion";
import ProviderDetailsForm from "./ProviderDetailsForm";
import ProviderRequestsForm from "./ProviderRequestsForm";
import ProviderBucketForm from "./ProviderBucketForm";
import PaymentInfo from "./PaymentInfo";

class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
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
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={Get_Provider} variables={{ id: this.state.id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <Error />;

                if (data.provider.length) {
                  let prov = data.provider[0];

                  let certTab = prov.provider_certificate;
                  certTab = certTab.map(cert => {
                    return {
                      title: cert.provider_certificate_category.name,
                      body: <img src={cert.certificate_image} />
                    };
                  });

                  let provTab = <ProviderDetailsForm provider={prov} />;
                  certTab = !certTab.length ? (
                    <NoResults />
                  ) : (
                      <Accordion rightTitle={true} data={certTab} />
                    );
                  let reqTab = <ProviderRequestsForm providerId={prov.id} />;
                  let bucTab = prov.provider_user.user_bocket_transactions.length ?
                    <ProviderBucketForm bucket={prov.provider_user.user_bocket_transactions} /> : <NoResults />;
                  let PayTab =
                    prov.provider_user.user_payment_info &&
                      Object.keys(prov.provider_user.user_payment_info).length ? (
                        <PaymentInfo
                          paymentInfo={prov.provider_user.user_payment_info}
                        />
                      ) : (
                        <NoResults />
                      );

                  let dataTabs = [
                    {
                      label: (
                        <b>
                          تفاصيل{" "}
                          {prov.provider_user.userType == "sitter"
                            ? "الحاضنة"
                            : "مركز الرعاية"}
                        </b>
                      ),
                      body: provTab
                    },
                    {
                      label: <b>شهادات الخبرة</b>,
                      body: certTab
                    },
                    {
                      label: <b>الطلبات</b>,
                      body: reqTab
                    },
                    {
                      label: <b>المحفظة</b>,
                      body: bucTab
                    },
                    {
                      label: <b>بيانات الدفع</b>,
                      body: PayTab
                    }
                  ];

                  return <Tabs data={dataTabs} />;
                } else
                  return (
                    <div>
                      <NoResults />
                    </div>
                  );
              }}
            </Query>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Provider;
