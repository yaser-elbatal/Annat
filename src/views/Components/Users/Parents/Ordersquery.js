import gql from "graphql-tag";

const Order_list = gql`
  query parentRequestDetails($parent_id: Int!) {
    request(where: { parent_id: { _eq: $parent_id } }) {
      id
      created_at
      provider_id

      request_provider {
        hour_price
        provider_user {
          userType
          name
        }
      }
      request_appointments {
        from
        to
        request_id
      }
      state
    }
  }
`;
export default Order_list;
