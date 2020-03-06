import gql from 'graphql-tag'

const update_Activation =gql`
mutation updateUser($activate: Boolean!, $user_id: uuid!) {
    update_user(where: {id: {_eq: $user_id}}, _set: {isActivated: $activate}) {
      affected_rows
    }
   }
`
export default update_Activation;