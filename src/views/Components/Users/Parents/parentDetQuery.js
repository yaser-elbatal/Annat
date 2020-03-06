import gql from 'graphql-tag';

export const Get_parentDet = gql` 

query get_parentDet($parent_id: Int) {
  parent(where: {id: {_eq: $parent_id}}) {
    parent_user {
      id
      name
      email
      phone
      updated_at
      created_at
      avatar
      isActivated
      isCompleted

    }
    id
    parent_child {
      name
    }
  }
}
`

export default Get_parentDet;