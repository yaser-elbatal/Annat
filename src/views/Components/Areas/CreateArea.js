import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_Area } from '../../../services/queries/Areas'
import _ from 'lodash'
import CreateAreaForm from "./CreateAreaForm"


export default class CreateArea extends Component {

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
                variables: { ...this.state.createdData, city_id: this.props.city_id },
                refetchQueries: [`ListAreas`]//{ query: List_Areas, variables: {city_id: this.props.city_id} }
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Create_Area}>
                {(createArea, { data }) => {
                    return <CreateAreaForm updateData={this.updateData} onSubmit={() =>{ this.createHandle(createArea); this.props.toggle();}} />
                }}
            </Mutation>
        );
    }
};