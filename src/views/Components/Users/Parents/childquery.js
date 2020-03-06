import gql from 'graphql-tag';


const Get_child = gql`

query  get_parentDet($parent_id: Int) {
    parent(where: {id: {_eq: $parent_id}}) {
      parent_child {
        birth_certificate_image
        birth_date
        created_at
        id
        name
        note
        parent_id
        updated_at
      }
      id
    }
  }
`

export default Get_child;