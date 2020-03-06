import gql from "graphql-tag";

const Search_query = gql`
  subscription getChild($searchQuery: String) {
    child(where: { name: { _like: $searchQuery } }) {
      updated_at
      parent_id
      note
      name
      id
      created_at
      birth_date
      birth_certificate_image
    }
  }
`;
export default Search_query;
