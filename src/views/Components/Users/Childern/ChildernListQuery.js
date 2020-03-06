import gql from 'graphql-tag'

const Get_Detailes = gql`
query getChildren {
    child {
      birth_date
      birth_certificate_image
      name
      parent_id
      created_at
      updated_at
      id
      note
    }
   }
`
export default Get_Detailes