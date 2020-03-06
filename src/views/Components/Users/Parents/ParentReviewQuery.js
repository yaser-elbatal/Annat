import gql from "graphql-tag";

const Get_parentReview = gql`
  query MyQuery($request_id: Int!) {
    request(where: { id: { _eq: $request_id } }) {
      request_parent_reviews {
        rate
        id
      }
    }
  }
`;
export default Get_parentReview;
