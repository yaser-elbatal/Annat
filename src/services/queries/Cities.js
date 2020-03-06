import gql from 'graphql-tag';



export const List_Cities = gql` 
  query ListCities {
    city(order_by: {id: asc}){
      id
      name
      name_ar
      created_at
      updated_at
      isNeglected
      city_area_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  `;

  
export const Update_City=gql`
mutation updateCity($id: Int!, $name: String, $name_ar: String,$isNeglected:Boolean!) {
  update_city(where: {id: {_eq: $id}}, _set: {name: $name, name_ar: $name_ar, isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;

export const Create_City=gql`
mutation addCity($name: String, $name_ar: String) {
  insert_city(objects: {name: $name, name_ar: $name_ar}) {
    affected_rows
  }
 }
`;