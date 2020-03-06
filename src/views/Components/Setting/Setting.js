import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import { Create_Setting, Get_Setting, Update_Setting } from '../../../services/queries/Settings';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import Tabs from "../Custom/Tabs/Tabs"
import RichTextEditor2 from "../Custom/RichTextEditor2/RichTextEditor2"
import _ from "lodash"


class ListSetting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: "",
      title: {},
      updatedData: {},
    }

  }


  componentDidMount() {
    let key = this.props.match.path.includes("aboutUs") ? "aboutUs" : "privacyPolicy";

    this.setState({
      key,
      title: key == "aboutUs" ?
        { en: "About Us", ar: "من نحن" } :
        { en: "Privacy Policy", ar: "شروط الخصوصية" },
    })

  }

  async componentWillReceiveProps() {
    let key = this.props.match.path.includes("aboutUs") ? "aboutUs" : "privacyPolicy";

    this.setState({
      key,
      title: key == "aboutUs" ?
        { en: "About Us", ar: "من نحن" } :
        { en: "Privacy Policy", ar: "شروط الخصوصية" },
    })
  }

  resultAr = (text) => {
    this.setState({
      updatedData: { ...this.state.updatedData, value_ar: text }
    })
  }

  resultEn = (text) => {
    this.setState({
      updatedData: { ...this.state.updatedData, value_en: text }
    })
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={Get_Setting} variables={{ key: this.state.key }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.settings) {
                    let setting = data.settings.length ? data.settings[0] :
                      { 'key': this.state.key, 'value_ar': "", 'value_en': "" };

                    setting = _.pick(setting, ['key', 'value_ar', 'value_en',])


                    let mainTab = (
                      <div style={{ direction: "ltr" }}>
                        <RichTextEditor2 text={setting.value_ar || ""} result={this.resultAr} />
                      </div>
                    )

                    let secondaryTab = (
                      <div style={{ direction: "ltr" }}>
                        <RichTextEditor2 text={setting.value_en || ""} result={this.resultEn} />
                      </div>
                    )

                    let dataTabs = [
                      {
                        label: <b>{this.state.title.ar}</b>,
                        body: mainTab
                      },
                      {
                        label: <b>{this.state.title.en}</b>,
                        body: secondaryTab
                      },
                    ]

                    let createOrUpdate = data.settings.length ? Update_Setting : Create_Setting;

                    let ret = (
                      <div>
                        <Tabs data={dataTabs} />
                        <Mutation mutation={createOrUpdate}>
                          {(updateSetting, { data }) => (
                            <div>
                              <button style={{ marginTop: "10px" }} onClick={() => {


                                updateSetting({
                                  variables: { ...setting, ...this.state.updatedData },
                                  refetchQueries: [`GetSetting`]
                                })
                              }} className="btn btn-primary" >تعديل</button>
                            </div>
                          )}
                        </Mutation>
                      </div>
                    )
                    return ret;

                  }
                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListSetting;