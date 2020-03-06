import gql from 'graphql-tag'

const Get_Payment = gql`
query getPaymentInfo($parent_id: Int!) {
    user(where: {user_parent: {id: {_eq: $parent_id}}}) {
      user_payment_info {
        card_number
        cvc
        holder_name
        id
        month
        year
      }
      id
    }
   }

`
export default Get_Payment;