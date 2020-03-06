import gql from "graphql-tag";

const my_Acoount = gql`
  subscription getUser($user_id: uuid!) {
    user(where: { id: { _eq: $user_id } }) {
      id
      name
      email
      phone
      avatar
      created_at
      updated_at
      password
    }
  }
`;
export default my_Acoount;
