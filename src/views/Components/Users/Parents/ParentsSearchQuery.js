import gql from 'graphql-tag'

const Search_parents = gql`
query getParents($searchQuery: String!) {
    user(where: {name: {_like: $searchQuery}, userType: {_eq: "parent"}}) {
      avatar
      email
      name
      phone
      userType
      created_at
      identity_image
    }
  }  
`
export default Search_parents;