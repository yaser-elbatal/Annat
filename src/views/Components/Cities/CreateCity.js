import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_City } from '../../../services/queries/Cities'
import CreateCityForm from "./CreateCityForm"


export default class CreateCity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdData: {}
        }
    }

    componentDidMount() {

    }

    updateData = (editedNewData) => {
        let createdData = this.state.createdData;
        this.setState({
            createdData: { ...createdData, ...editedNewData }
        })
    }

    createHandle = (createArea) => {
        createArea(
            {
                variables: { ...this.state.createdData},
                refetchQueries: [`ListCities`]
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Create_City}>
                {(createCity, { data }) => {
                    return <CreateCityForm updateData={this.updateData} onSubmit={() =>{ this.createHandle(createCity); this.props.toggle();}} />
                }}
            </Mutation>
        );
    }
};