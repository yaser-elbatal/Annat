import gql from "graphql-tag";

export const Edit_Account = gql`
  mutation updateUser(
    $user_id: uuid!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    update_user(
      where: { id: { _eq: $user_id } }
      _set: { email: $email, phone: $phone, password: $password }
    ) {
      affected_rows
    }
  }
`;
export default Edit_Account;
