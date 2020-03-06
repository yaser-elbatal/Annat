import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { Get_Dashboard } from '../../../services/queries/Dashboard';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import NoResults from "../Custom/NoResults/NoResults"
import Widget01 from "../../Widgets/Widget01"
import Widget02 from "../../Widgets/Widget02"
import Widget03 from "../../Widgets/Widget03"
import Widget04 from "../../Widgets/Widget04"


class DisplayDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: <div></div>
    }
  }

  componentDidMount() {
    let data = <Query query={Get_Dashboard} fetchPolicy="no-cache" >
      {
        ({ loading, error, data, }) => {
          if (loading) return (<Loader />);
          if (error) return (<Error />);

          if (data) {

            let scalars = data.scalars[0]
            //map on 'data' to extract data in flat level
            Object.keys(data).map(function (key) {
              data[key] = { ...data[key]['aggregate'] };
            });

            let {
              accepted_request, canceled_request, complete_request,
              new_request, paid_request, progress_request,
              organization, child, parent, sitter,
              withdraw_app, withdraw_fine, withdraw_request,
              deposit_admin, deposite_fine, deposite_request, } = data,
              users = child.count + organization.count + parent.count + sitter.count,
              withdraw = (withdraw_app.sum.amount || 0) + (withdraw_fine.sum.amount || 0) + (withdraw_request.sum.amount || 0),
              deposit = (deposit_admin.sum.amount || 0) + (deposite_fine.sum.amount || 0) + (deposite_request.sum.amount || 0),
              reqCount = accepted_request.count + canceled_request.count + complete_request.count +
                new_request.count + paid_request.count + progress_request.count,
              reqTotalHours = (accepted_request.sum.totalHours || 0) + (canceled_request.sum.totalHours || 0) +
                (complete_request.sum.totalHours || 0) + (new_request.sum.totalHours || 0) +
                (paid_request.sum.totalHours || 0) + (progress_request.sum.totalHours || 0),
              reqTotalCost = parseInt(parseInt(accepted_request.sum.totalCost || 0)) + parseInt(parseInt(canceled_request.sum.totalCost || 0)) +
                parseInt(parseInt(complete_request.sum.totalCost || 0)) + parseInt(parseInt(new_request.sum.totalCost || 0)) +
                parseInt(parseInt(paid_request.sum.totalCost || 0)) + parseInt(parseInt(progress_request.sum.totalCost || 0))


            return (
              <div className="animated fadeIn">
                <Row>
                  <Col xs="12" sm="6" lg="3">
                    <Link to="/providers" style={{ textDecoration: "none" }} >
                      <Widget01 variant="inverse" color="info"
                        value={`${(sitter.count + organization.count) * 100 / users}`}
                        mainText="مقدمى الرعاية" header={`${sitter.count + organization.count}`}
                        smallText={`الحاضنات ${1} - مركز الرعاية ${2}`} />
                    </Link>
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Link to="/parents" style={{ textDecoration: "none" }} >
                      <Widget01 color="primary" variant="inverse" value={`${parent.count * 100 / users}`}
                        header={`${parent.count}`} mainText="أولياء الأمور" smallText="." />
                    </Link>
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Link to="/children" style={{ textDecoration: "none" }} >
                      <Widget01 color="warning" variant="inverse" value={`${child.count * 100 / users}`}
                        header={`${child.count}`} mainText="الأبناء" smallText="." />
                    </Link>
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="danger"
                      header={`${parseInt(canceled_request.sum.totalCost || 0)} ريال س`}
                      mainText={`طلبات تم رفضها (${canceled_request.count})`}
                      value={`${parseInt(parseInt(canceled_request.sum.totalCost || 0)) * 100 / reqTotalCost}`}
                      smallText={`عدد الساعات : ${canceled_request.sum.totalHours || 0} ساعة`} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="warning"
                      header={`${parseInt(new_request.sum.totalCost || 0)} ريال س`}
                      mainText={`طلبات جديدة (${new_request.count})`}
                      value={`${parseInt(parseInt(new_request.sum.totalCost || 0)) * 100 / reqTotalCost}`}
                      smallText={`عدد الساعات : ${new_request.sum.totalHours || 0} ساعة`} />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="info"
                      header={`${parseInt(paid_request.sum.totalCost || 0)} ريال س`}
                      mainText={`طلبات مدفوعة (${paid_request.count})`}
                      value={`${parseInt(parseInt(paid_request.sum.totalCost || 0)) * 100 / reqTotalCost}`}
                      smallText={`عدد الساعات : ${paid_request.sum.totalHours || 0} ساعة`} />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="info"
                      header={`${parseInt(accepted_request.sum.totalCost || 0)} ريال س`}
                      mainText={`طلبات تم الوافقة عليها (${accepted_request.count})`}
                      value={`${parseInt(parseInt(accepted_request.sum.totalCost || 0)) * 100 / reqTotalCost}`}
                      smallText={`عدد الساعات : ${accepted_request.sum.totalHours || 0} ساعة`} />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="info"
                      header={`${parseInt(progress_request.sum.totalCost || 0)} ريال س`}
                      mainText={`طلبات جارية (${progress_request.count})`}
                      value={`${parseInt(parseInt(progress_request.sum.totalCost || 0)) * 100 / reqTotalCost}`}
                      smallText={`عدد الساعات : ${progress_request.sum.totalHours || 0} ساعة`} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="success"
                      header={`${parseInt(complete_request.sum.totalCost || 0)} ريال س`}
                      mainText={`طلبات انتهت (${complete_request.count})`}
                      value={`${parseInt(parseInt(complete_request.sum.totalCost || 0)) * 100 / reqTotalCost}`}
                      smallText={`عدد الساعات : ${complete_request.sum.totalHours || 0} ساعة`} />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="danger"
                      header={`${parseInt(deposite_fine.sum.amount || 0) + parseInt(deposite_request.sum.amount || 0) + parseInt(deposit_admin.sum.amount || 0)} ريال س`}
                      mainText={`ما تم دفعه لمستخدمى النظام`}
                      value={`${parseInt(deposite_fine.sum.amount || 0) + parseInt(deposite_request.sum.amount || 0) + parseInt(deposit_admin.sum.amount || 0) * 100 / deposit}`}
                      smallText="." />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="info"
                      header={`${parseInt(withdraw_fine.sum.amount || 0) + parseInt(withdraw_request.sum.amount || 0) + parseInt(withdraw_app.sum.amount || 0)} ريال س`}
                      mainText={`ما تم سحبه من مستخدمى النظام`}
                      value={`${parseInt(withdraw_fine.sum.amount || 0) + parseInt(withdraw_request.sum.amount || 0) + parseInt(withdraw_app.sum.amount || 0) * 100 / withdraw}`}
                      smallText="." />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 variant="inverse" color="success"
                      header={`${parseInt(withdraw || 0) - parseInt(deposit || 0)} ريال س`}
                      mainText={`عائد النظام`}
                      value={`100`}
                      smallText="." />
                  </Col>
                </Row>
                <Row>
                  <Col sm="6" md="2">
                    <Widget04 icon="fa fa-money" color="info" header={`${deposite_fine.sum.amount || 0} ريال س`} value={`${deposite_fine.sum.amount || 0 * 100 / deposit}`} invert>استقبال بدل غرامة</Widget04>
                  </Col>
                  <Col sm="6" md="2">
                    <Widget04 icon="fa fa-money" color="success" header={`${deposite_request.sum.amount || 0} ريال س`} value={`${deposite_request.sum.amount || 0 * 100 / deposit}`} invert>استقبال ثمن طلب</Widget04>
                  </Col>
                  <Col sm="6" md="2">
                    <Widget04 icon="fa fa-money" color="warning" header={`${deposit_admin.sum.amount || 0} ريال س`} value={`${deposit_admin.sum.amount || 0 * 100 / deposit}`} invert>إيداع فى المحفظة</Widget04>
                  </Col>
                  <Col sm="6" md="2">
                    <Widget04 icon="fa fa-money" color="primary" header={`${withdraw_fine.sum.amount || 0} ريال س`} value={`${withdraw_fine.sum.amount || 0 * 100 / withdraw}`} invert>دفع غرامة</Widget04>
                  </Col>
                  <Col sm="6" md="2">
                    <Widget04 icon="fa fa-money" color="danger" header={`${withdraw_request.sum.amount || 0} ريال س`} value={`${withdraw_request.sum.amount || 0 * 100 / withdraw}`} invert>دفع ثمن الطلب</Widget04>
                  </Col>
                  <Col sm="6" md="2">
                    <Widget04 icon="fa fa-money" color="info" header={`${withdraw_app.sum.amount || 0} ريال س`} value={`${withdraw_app.sum.amount || 0 * 100 / withdraw}`} invert>خصم نسبة التطبيق</Widget04>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6" lg="2">
                    <Widget02 header={`${scalars.app_percentage}%`} mainText="نسبة التطبيق" icon="fa fa-cogs" color="primary" />
                  </Col>
                  <Col xs="12" sm="6" lg="2">
                    <Widget02 header={`${scalars.organization_hour_price} رس`} mainText="ساعة المركز" icon="fa fa-clock-o" color="info" />
                  </Col>
                  <Col xs="12" sm="6" lg="2">
                    <Widget02 header={`${scalars.sitter_hour_price} رس`} mainText="ساعة الحاضنة" icon="fa fa-clock-o" color="success" />
                  </Col>
                  <Col xs="12" sm="6" lg="2">
                    <Widget02 header={`${scalars.provider_to_home_price} رس`} mainText="الذهاب للطفل" icon="fa fa-home" color="warning" />
                  </Col>
                  <Col xs="12" sm="6" lg="2">
                    <Widget02 header={`${scalars.fine_per_minute} رس`} mainText="غرامة لكل دقيقة" icon="fa fa-exclamation-circle" color="danger" />
                  </Col>
                </Row>
              </div>
            );
          }
          else return (<div><NoResults /></div>);
        }
      }
    </Query>

    this.setState({ data })

    setInterval(() => this.setState({ data }), 20000);

  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }


  render() {

    return (<div>{this.state.data}</div>
    )
  }
}

export default DisplayDashboard;