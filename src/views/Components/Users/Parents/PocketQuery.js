import gql from "graphql-tag";

const Getpocket = gql`
  query get_parentDet($parent_id: Int) {
    parent(where: { id: { _eq: $parent_id } }) {
      parent_user {
        user_bocket_transactions {
          amount
          action
          created_at
          id
        }
      }
    }
  }
`;
export default Getpocket;
