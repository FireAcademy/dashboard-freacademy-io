import { getAuth } from 'firebase/auth';

export const API_BASE_URL = "https://kraken.fireacademy.io/api/";

export async function getDashboardData() {
    const token = await getAuth().currentUser.getIdToken();

    return fetch(API_BASE_URL + "dashboard-data", {
        method: 'GET',
        headers: {
          "Authorization": token
        }
      }).then(response => response.json());
}

export async function createAPIKey(name, origin, limit) {
    const token = await getAuth().currentUser.getIdToken();

    let limitInt;
    try {
        limitInt = parseInt(limit);
    } catch(_) {
        return {message: "limit should be an int :|"}
    }

    return fetch(API_BASE_URL + "api-key", {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            monthly_credit_limit: limitInt,
            name, origin
        })
      }).then(response => response.json());
}

export async function updateAPIKey(apiKey, name, limit, origin, disabled) {
    const token = await getAuth().currentUser.getIdToken();

    let limitInt;
    try {
        limitInt = parseInt(limit);
    } catch(_) {
        return {message: "limit should be an int :|"}
    }

    return fetch(API_BASE_URL + "api-key", {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_key: apiKey,
            disabled, origin, name,
            monthly_credit_limit: limitInt
        })
      }).then(response => response.json());
}

export async function getStripeDashboardURL() {
    const token = await getAuth().currentUser.getIdToken();

    return fetch(API_BASE_URL + "stripe-dashboard-url", {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
}

export async function getPlans() {
  const token = await getAuth().currentUser.getIdToken();

  return fetch(API_BASE_URL + "plans", {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    }).then(response => response.json());
}

export async function getSubscribeURL(plan_id) {
  const token = await getAuth().currentUser.getIdToken();

  return fetch(API_BASE_URL + "subscribe-url", {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          plan_id,
      })
    }).then(response => response.json());
}

export async function updateUserPlan(plan_id, auto_purchase_credits_packages) {
  const token = await getAuth().currentUser.getIdToken();

  return fetch(API_BASE_URL + "user-plan", {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          plan_id, auto_purchase_credits_packages
      })
    }).then(response => response.json());
}

export async function redeemGiftCode(code, apiKey) {
    const token = await getAuth().currentUser.getIdToken();

    return fetch(API_BASE_URL + "gift-code", {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code, api_key: apiKey
        })
      }).then(response => response.json());
}

export async function getUpdates() {
  const token = await getAuth().currentUser.getIdToken();

  return fetch(API_BASE_URL + "updates", {
      method: 'GET',
      headers: {
        "Authorization": token
      }
    }).then(response => response.json());
}

export async function acknowledgeUpdates() {
  const token = await getAuth().currentUser.getIdToken();

  return fetch(API_BASE_URL + "updates", {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
    }).then(response => response.json());
}

export async function createTicket(message, emotionalState, anonymous, contact) {
  const token = await getAuth().currentUser.getIdToken();

  return fetch(API_BASE_URL + "ticket", {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          message,
          anonymous,
          contact,
          emotional_state: emotionalState
      })
    }).then(response => response.json());
}