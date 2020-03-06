import gql from "graphql-tag";

const Get_chat = gql`
  query MyQuery($request_id: Int!) {
    request(where: { id: { _eq: $request_id } }) {
      request_chat {
        image
        created_at
        message
        sender
        updated_at
        id
      }
      id
    }
  }
`;
export default Get_chat;
