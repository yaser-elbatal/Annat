import gql from "graphql-tag";
const Edit_scale = gql`
  mutation updateScalars(
    $scalars_id: Int!
    $organization_hour_price: Int!
    $sitter_hour_price: Int!
    $provider_to_home_price: Int!
    $fine_per_minute: float8!
    $app_percentage: Int!
  ) {
    update_scalars(
      where: { id: { _eq: $scalars_id } }
      _set: {
        organization_hour_price: $organization_hour_price
        provider_to_home_price: $provider_to_home_price
        sitter_hour_price: $sitter_hour_price
        fine_per_minute: $fine_per_minute
        app_percentage: $app_percentage
      }
    ) {
      affected_rows
    }
  }
`;
export default Edit_scale;
