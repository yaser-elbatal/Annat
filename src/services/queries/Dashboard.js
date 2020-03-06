import gql from 'graphql-tag';



export const Get_Dashboard = gql` 
query GetDashboard {
  parent: parent_aggregate {
    aggregate {
      count(columns: id)
    }
  }
  organization: provider_aggregate(where: {provider_user: {userType: {_eq: "organization"}}}) {
    aggregate {
      count(distinct: true, columns: id)
    }
  }
  sitter: provider_aggregate(where: {provider_user: {userType: {_eq: "sitter"}}}) {
    aggregate {
      count(distinct: true, columns: id)
    }
  }
  new_request: request_aggregate(where: {state: {_eq: "new"}}) {
    aggregate {
      count(columns: id)
      sum {
        totalHours
        totalCost
      }
    }
  }
  accepted_request: request_aggregate(where: {state: {_eq: "accepted"}}) {
    aggregate {
      count(columns: id)
      sum {
        totalHours
        totalCost
      }
    }
  }
  progress_request: request_aggregate(where: {state: {_eq: "progress"}}) {
    aggregate {
      count(columns: id)
      sum {
        totalHours
        totalCost
      }
    }
  }
  complete_request: request_aggregate(where: {state: {_eq: "complete"}}) {
    aggregate {
      count(columns: id)
      sum {
        totalHours
        totalCost
      }
    }
  }
  canceled_request: request_aggregate(where: {state: {_eq: "canceled"}}) {
    aggregate {
      count(columns: id)
      sum {
        totalHours
        totalCost
      }
    }
  }
  paid_request: request_aggregate(where: {state: {_eq: "paid"}}) {
    aggregate {
      count(columns: id)
      sum {
        totalHours
        totalCost
      }
    }
  }
  scalars {
    app_percentage
    fine_per_minute
    organization_hour_price
    provider_to_home_price
    sitter_hour_price
    updated_at
  }
  child: child_aggregate {
    aggregate {
      count(columns: id)
    }
  }
  deposit_admin: bocket_transactions_aggregate(where: {action: {_eq: deposit_admin}}) {
    aggregate {
      count(columns: id)
      sum {
        amount
      }
    }
  }
    deposite_fine: bocket_transactions_aggregate(where: {action: {_eq: deposite_fine}}) {
    aggregate {
      count(columns: id)
      sum {
        amount
      }
    }
  }
      deposite_request: bocket_transactions_aggregate(where: {action: {_eq: deposite_request}}) {
    aggregate {
      count(columns: id)
      sum {
        amount
      }
    }
  }
        withdraw_app: bocket_transactions_aggregate(where: {action: {_eq: withdraw_app}}) {
    aggregate {
      count(columns: id)
      sum {
        amount
      }
    }
  }
        withdraw_fine: bocket_transactions_aggregate(where: {action: {_eq: withdraw_fine}}) {
    aggregate {
      count(columns: id)
      sum {
        amount
      }
    }
  }
        withdraw_request: bocket_transactions_aggregate(where: {action: {_eq: withdraw_request}}) {
    aggregate {
      count(columns: id)
      sum {
        amount
      }
    }
  }
}
  `;