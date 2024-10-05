import axios from 'axios';

const server_url = "http://127.0.0.1:5000";

export async function getBrands() {
    var response
    var brands = []
    try {
        response = await axios.get(server_url + "/brands");
    } catch (error) {
        console.error("Error fetching brands", error);
        return [];
    }
    brands = response.data;

    return brands;
}

export async function deleteVehicle(vehicleId) {
    var response
    try {
        response = await axios.delete(server_url + `/delete_vehicle/${vehicleId}`)

        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error fetching brands", error);
        return false;
    }

    return false;
}

export async function addVehicle(vehicleData) {
    var response
    try {
        response = await axios.post(server_url + "/add_vehicle", vehicleData)

        if (response.status === 201) {
            return true
        }
    } catch (error) {
        console.error("Adding a new vehicle failed")
        return false;
    }
    return false;
}

export async function updateVehicle(vehicleId, vehicleData) {
    var response
    try {
        response = await axios.put(server_url + `/update_vehicle/${vehicleId}`, vehicleData)

        if (response.status === 200) {
            return true
        }
    } catch (error) {
        console.error("Updating vehicle data failed")
        return false;
    }
    return false;
}

export async function getVehicles(filterData) {
    var response
    try {
        response = await axios.post(server_url + "/vehicles", filterData);
    } catch (error) {
        console.error("Error fetching vehicles", error);
        return [];
    }
    const vehicles = response.data;

    return vehicles;
}

export async function loginUser(username, password) {
    var response
    try {
        response = await axios.post(server_url + "/login", { "name": username, "password": password });
    } catch (error) {
        console.error("Error logging in", error);
        return {}
    }
    const user = response.data;
    console.log(user);

    return user;
}
