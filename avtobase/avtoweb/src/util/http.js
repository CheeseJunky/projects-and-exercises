import axios from 'axios';

// Rsbuild inlines PUBLIC_* variables (see rsbuild.config.mjs), so the API host
// is configurable per environment instead of being hard coded.
const SERVER_URL = process.env.PUBLIC_SERVER_URL || 'http://127.0.0.1:5000';

const client = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// The write endpoints are now protected server side, so every request carries
// the bearer token issued by /login.
let authToken = null;

export function setAuthToken(token) {
    authToken = token || null;
}

client.interceptors.request.use((requestConfig) => {
    if (authToken) {
        requestConfig.headers.Authorization = `Bearer ${authToken}`;
    }
    return requestConfig;
});

// The API returns vehicles in snake_case, so every write uses the same shape.
// Numeric columns are sent as numbers instead of the strings the inputs hold.
function toVehiclePayload(vehicle) {
    return {
        brand: Number(vehicle.brand),
        model: vehicle.model,
        year: Number(vehicle.year),
        price: Number(vehicle.price),
        fuel_type: Number(vehicle.fuel_type),
        doors: Number(vehicle.doors),
        description: vehicle.description ?? '',
        image_url: vehicle.image_url ?? '',
    };
}

export async function getBrands() {
    const response = await client.get('/brands');
    return Array.isArray(response.data) ? response.data : [];
}

export async function getVehicles(filterData = {}) {
    const response = await client.post('/vehicles', filterData);
    return Array.isArray(response.data) ? response.data : [];
}

export async function addVehicle(vehicleData) {
    await client.post('/add_vehicle', toVehiclePayload(vehicleData));
}

export async function updateVehicle(vehicleId, vehicleData) {
    await client.put(`/update_vehicle/${vehicleId}`, toVehiclePayload(vehicleData));
}

export async function deleteVehicle(vehicleId) {
    await client.delete(`/delete_vehicle/${vehicleId}`);
}

// Resolves to the user (including the session token) on success, or null when
// the credentials are rejected. Network/server failures reject so the caller
// can tell them apart.
export async function loginUser(email, password) {
    try {
        const response = await client.post('/login', { name: email, password });
        return response.data?.token ? response.data : null;
    } catch (error) {
        if (error?.response?.status === 401 || error?.response?.status === 400) {
            return null;
        }
        throw error;
    }
}

// Best effort: the local session is cleared regardless of the response.
export async function logoutUser() {
    try {
        await client.post('/logout');
    } catch {
        /* the token expires on its own anyway */
    }
}

// Validates a stored token after a page reload.
export async function fetchCurrentUser() {
    try {
        const response = await client.get('/me');
        return response.data || null;
    } catch {
        return null;
    }
}

// Turns an axios failure into something worth putting in a snackbar.
export function describeError(error, fallback = 'Something went wrong') {
    const status = error?.response?.status;

    if (status === 401) {
        return 'Your session has expired. Please log in again.';
    }
    if (status === 403) {
        return 'You need administrator rights to do that.';
    }
    if (error?.response?.data?.error) {
        return error.response.data.error;
    }
    if (error?.code === 'ECONNABORTED') {
        return 'The server took too long to respond';
    }
    if (error?.message === 'Network Error') {
        return 'Could not reach the server';
    }
    return error?.message || fallback;
}
