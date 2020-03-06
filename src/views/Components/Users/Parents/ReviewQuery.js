import gql from "graphql-tag";

const Get_Review = gql`
  query MyQuery($request_id: Int!) {
    request(where: { id: { _eq: $request_id } }) {
      request_parent_reviews {
        parent_reviews_provider {
          go_to_client
          experience
          created_at
          hostling_images
          hour_price
          isWorking
          location_description
          maxAge
          maxCount
          id
        }
      }
      id
    }
  }
`;

export default Get_Review;
