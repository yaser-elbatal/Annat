import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Edit_Account from "./EditQuery";
import PopUp from "./PopUp";
import my_Acoount from "./myAccountQuery";
import UpdateAccountForm from "./UpdateAccountForm";
import _ from "lodash";
import imgUpload from "./imgUpload";
import Axios from "axios";

export class EditMyAccout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Admin: this.props.Admin[0],
      updateData: {
        id: this.props.Admin[0].id,
        email: this.props.Admin[0].email,
        phone: this.props.Admin[0].phone
      },
      phone: ""
    };
  }

  ChangePassword = async updateMyaccount => {
    let { oldPassword, NewPassword, ConfirmPassword } = this.state.updateData;
    this.setState({
      updateData: _.omit(this.state.updateData, [
        "oldPassword",
        "NewPassword",
        "ConfirmPassword"
      ])
    });
    let { phone } = this.state.Admin;

    // console.log({
    //   oldPassword,
    //   NewPassword,
    //   ConfirmPassword,
    //   phone,
    //   updateData: this.state.updateData
    // });

    try {
      if (
        (NewPassword || false) == (ConfirmPassword || false) &&
        NewPassword &&
        oldPassword
      ) {
        let CheckPassword = await Axios.post(
          "http://68.183.67.204:3000/changePassword",
          {
            phone,
            oldPassword,
            newPassword: NewPassword,
            confirmNewPassword: ConfirmPassword
          }
        );
        console.log(
          "Variables",
          phone,
          oldPassword,
          NewPassword,
          ConfirmPassword
        );

        console.log("Change Data with Password");
        console.log(CheckPassword);
        if (CheckPassword.status == 200) {
          if (Object.keys(this.state.updateData).length) {
            updateMyaccount();
            console.log("M");
          }
        }
      } else if (
        (NewPassword || false) == (ConfirmPassword || false) &&
        !NewPassword &&
        oldPassword
      ) {
        console.log("Change Data");
        let CheckPassword = await Axios.post(
          "http://68.183.67.204:3000/changePassword",
          {
            phone,
            oldPassword,
            newPassword: oldPassword,
            confirmNewPassword: oldPassword
          }
        );
        if (CheckPassword.status == 200) {
          if (Object.keys(this.state.updateData).length) {
            updateMyaccount();
            console.log("ahmed");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  clearData = () => this.setState({ updatedData: {} });

  updateData = accountNewData => {
    let Admin = this.state.Admin;
    this.setState({
      Admin: { ...Admin, ...accountNewData },
      updateData: { ...this.state.updateData, ...accountNewData }
    });
  };

  updateHandle = async updateMyaccount => {
    let Admin = this.state.Admin;
    let accountNewData = this.state.updatedData;
    Admin = { ...Admin, ...accountNewData };
    let id = this.state.Admin.id;
    if (this.state.Admin.file)
      await imgUpload(this.state.Admin.file, (u, l) => {
        console.log({ u, l });
      });

    this.setState({ Admin });
    await this.ChangePassword(updateMyaccount);

    // updateMyaccount();
  };

  render() {
    return (
      <Mutation
        mutation={Edit_Account}
        variables={{
          user_id: this.state.Admin.id,
          email: this.state.Admin.email,
          phone: this.state.Admin.phone,
          password: this.state.Admin.password
        }}
      >
        {(updateMyaccount, { data }) => (
          <React.Fragment>
            <PopUp
              {...{
                buttonLabel: "تعديل",
                buttonColor: "success",
                body: (
                  <UpdateAccountForm
                    data={this.state.Admin}
                    clearData={this.clearData}
                    updateData={this.updateData}
                  />
                ),
                submitLabel: "تعديل",
                cancelLabel: "تراجع",
                onSubmit: async () => await this.updateHandle(updateMyaccount)
              }}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default EditMyAccout;
