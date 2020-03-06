import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Activation_Provider, } from '../../../../services/queries/Providers'
import _ from 'lodash'


export default class ActivationProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    activationHandle = (updateUser) => {
        let id = this.props.id
        let isActivated = !this.props.isActivated

        updateUser(
            {
                variables: { id, isActivated },
                refetchQueries: ['ListProviders']
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Activation_Provider}>
                {(updateUser, { data }) => (
                    <React.Fragment>
                        <td>
                            {
                                <button
                                    className={`btn btn-${this.props.isActivated ? 'danger' : "primary"}`}
                                    onClick={e => this.activationHandle(updateUser)}>
                                    {this.props.isActivated ? 'إلغاء' : 'تفعيل'}
                                </button>
                            }
                        </td>
                    </React.Fragment>
                )}
            </Mutation>
        );
    }
};