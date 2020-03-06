// import image1 from '../assets/avatars/1.jpg'
// import image2 from '../assets/avatars/2.jpg'
// import image3 from '../assets/avatars/3.jpg'
// import image4 from '../assets/avatars/4.jpg'
import gql from "graphql-tag";

export const Get_parents = gql`
  subscription getParents($searchQuery: String!) {
    user(
      where: { name: { _like: $searchQuery }, userType: { _eq: "parent" } }
    ) {
      avatar
      id
      name
      phone
      email
      isActivated
      user_parent {
        id
        parent_child {
          id
        }
      }
    }
  }
`;
export default Get_parents;
