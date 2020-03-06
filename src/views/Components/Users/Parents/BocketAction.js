import React, { Component } from "react";
import { Badge } from "reactstrap";

export class BocketAction extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.action === "withdraw" ? (
          <Badge color="primary"> سحب المبلغ من المحفظه الي ولي الامر</Badge>
        ) : this.props.action === "deposit_admin" ? (
          <Badge color="secondary">شحن المحفظه للعميل</Badge>
        ) : this.props.action === "deposite_fine" ? (
          <Badge color="success">تحويل مبلغ الغرامه للعميل</Badge>
        ) : this.props.action === "deposite_request" ? (
          <Badge color="warning">دفع الاجر لمقدمي الرعايه</Badge>
        ) : this.props.action === "withdraw_fine" ? (
          <Badge color="warning">دفع مقدمي الخدمه الغرامه</Badge>
        ) : this.props.action === "withdraw_request" ? (
          <Badge color="warning">دفع فلوس الطلب</Badge>
        ) : (
          <Badge color="warning">خصم نسبه التطبيق</Badge>
        )}
      </React.Fragment>
    );
  }
}

export default BocketAction;
