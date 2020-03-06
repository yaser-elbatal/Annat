import gql from 'graphql-tag';



export const List_Providers = gql` 
  subscription ListProviders {
    user(where: {userType: {_neq: "parent"}}) {
      id
      avatar
      created_at
      email
      isActivated
      name
      phone
      provider_id
      isCompleted
      userType
      user_provider {
        provider_area {
          name_ar
          area_city {
            name_ar
          }
        }
      }
    }
  }
  `;


export const Get_Provider = gql`
query Get_Provider($id: Int!) {
provider(where: {id: {_eq: $id}}) {
  id
  created_at
  experience
  go_to_client
  hostling_images
  hour_price
  isWorking
  lang
  lat
  location_description
  maxAge
  maxCount
  minAge
  rate
  receive_in_home
  updated_at
  user_id
  provider_area {
    name
    area_city {
      name
    }
  }
  provider_certificate {
    certificate_image
    provider_certificate_category {
      name
    }
  }
  provider_reviews {
    created_at
    kid_reaction
    negative_review
    parent_id
    positive_review
  }
  provider_user {
    avatar
    email
    identity_image
    isActivated
    isCompleted
    name
    phone
    updated_at
    userType
    user_payment_info {
      card_number
      cvc
      holder_name
      month
      year
    }
    user_bocket_transactions {
      action
      amount
      created_at
    }
  }
}
}
  `;


export const List_Provider_Requests = gql`
subscription ListProviderRequests($provider_id: Int!) {
  request(where: {provider_id: {_eq: $provider_id}}, distinct_on: id) {
    id
    created_at
    lang
    lat
    location_description
    parent_id
    state
    totalCost
    totalHours
    updated_at
    request_appointments {
      from
      id
      to
      updated_at
      trigger_validator
      day_date
      appointments {
        fine_bocket_transactions {
          amount
          created_at
          user_id
          id
        }
        description
      }
      appointment_log {
        created_at
        status
        id
      }
    }
    request_children {
      request_children_child {
        name
      }
    }
    request_parent {
      parent_user {
        name
      }
    }
    request_provider_reviews {
      created_at
      kid_reaction
      negative_review
      positive_review
      rate
      updated_at
    }
    request_chat {
      sender
      message
      image
      created_at
      updated_at
    }
    request_provider {
      provider_user {
        id
      }
    }
    father_go
    request_parent_reviews {
      created_at
      id
      rate
      updated_at
    }
  }
}
  `;


export const Activation_Provider = gql`
mutation updateUser($id: uuid!, $isActivated:Boolean!) {
  update_user(where: {id: {_eq: $id}}, _set: {isActivated: $isActivated}) {
    affected_rows
  }
 }
`;



// query ListProviders($filt1: user_bool_exp, $filt2: provider_bool_exp) {
//   user(where: {_and: [{userType: {_neq: "parent"}}, $filt1], user_provider: {}}) {
//     id
//     avatar
//     created_at
//     email
//     isActivated
//     name
//     phone
//     provider_id
//     isCompleted
//     userType
//     user_provider {
//       provider_area {
//         name_ar
//         area_city {
//           name_ar
//         }
//       }
//     }
//   }
// }

// {
//   "filt1": {"_or": [
//     {"name": {"_like": "لم%"}},
//         {"name": {"_like": "لم%"}},
//         {"name": {"_like": "لم%"}}
//   ]}
// }
