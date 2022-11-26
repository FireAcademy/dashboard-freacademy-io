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
            weekly_credit_limit: limitInt,
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
            weekly_credit_limit: limitInt
        })
      }).then(response => response.json());
}

export async function getStripeURL() {
    const token = await getAuth().currentUser.getIdToken();

    return fetch(API_BASE_URL + "stripe-url", {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
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