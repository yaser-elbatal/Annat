import React, { Component } from 'react'
import update_Activation from './updateActivationquery';
import _ from 'lodash';
import { Mutation } from 'react-apollo';



export class Activationbutton extends Component {


    constructor(props) {
        super(props);
        this.state = {
            updatedData: {},
            parent:this.props.parent
        }
    
    }

        deleteHandle = (updateParent) => {
    

            let parent = this.state.parent
            parent.isActivated = !parent.isActivated
            this.setState({ parent });

            let dat = {activate: parent.isActivated, user_id: this.props.parent.id}
            updateParent(
                {
                    variables: {...dat},
                    // refetchQueries: [{ query: update_Activation, variables: {user_id: this.state.parent.id} }]
                }
            )
        }

    render() {
        return (
            <Mutation mutation={update_Activation}>
             {(updateParent, { data }) => {
                 
                 return(
                    <button
                        className={`btn btn-${this.state.parent.isActivated ? 'primary' : 'danger'}`}
                        onClick={e =>this.deleteHandle(updateParent)}>
                        {this.state.parent.isActivated ? ' الغاء تفعيل' : ' تفعيل '}
                    </button>
             )}}
        </Mutation>
            
        )
    }
}

export default Activationbutton
