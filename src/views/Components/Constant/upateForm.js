import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export class UpdateForm extends Component {
  changeHandle = e => {
    if (this.props.UpdateData)
      this.props.UpdateData({ [e.target.name]: e.target.value });
  };
  createHandle = e => {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit();
  };
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="organization_hour_price">سعرالساعه في المركز </Label>
          <Input
            type="number"
            name="organization_hour_price"
            defaultValue=" "
            onChange={this.changeHandle}
            placeholder=" سعر المركز"
          />
        </FormGroup>
        <FormGroup>
          <Label for="provider_to_home_price">
            سعر لذهاب مقدم الرعاية للزهاب للمنزل
          </Label>
          <Input
            type="number"
            name="provider_to_home_price"
            defaultValue=""
            onChange={this.changeHandle}
            placeholder="سعر الحاضن للذهاب المنزل"
          />
        </FormGroup>
        <FormGroup>
          <Label for="sitter_hour_price">سعر الساعه للحاضن</Label>
          <Input
            type="number"
            name="sitter_hour_price"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder="سعر الساعه لمقدم الرعاية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="fine_per_minute">سعر الغرامه بالدقيقه</Label>
          <Input
            type="number"
            name="fine_per_minute"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder="سعر الغرامه بالدقيقه"
          />
        </FormGroup>
        <FormGroup>
          <Label for="app_percentage"> نسبه التطبيق</Label>
          <Input
            type="number"
            name="app_percentage"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder="نسبه التطبيق"
          />
        </FormGroup>
        <button className="btn btn-primary" onClick={this.createHandle}>
          إضافة
        </button>
      </Form>
    );
  }
}

export default UpdateForm;
