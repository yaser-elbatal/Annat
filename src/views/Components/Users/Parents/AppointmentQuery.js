import gql from "graphql-tag";

const request_appointments = gql`
  query MyQuery($request_id: Int!) {
    request(where: { id: { _eq: $request_id } }) {
      request_appointments {
        created_at
        from
        day_date
        id
        request_id
        to
        updated_at
        trigger_validator
        appointment_log {
          status
          created_at
          id
        }
      }
      id
      state
    }
  }
`;

export default request_appointments;
