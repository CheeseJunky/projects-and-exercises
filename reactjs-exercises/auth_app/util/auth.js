import axios from "axios";

const api_key = "";

export async function createUser (mail, pass) {
    const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + api_key,
        {
            email: mail,
            password: pass,
            returnSecureToken: true
        }
    );
    
    const token = response.data.idToken;
    return token;
}

export async function signInUser (mail, pass) {
    const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + api_key,
        {
            email: mail,
            password: pass,
            returnSecureToken: true
        }
    );
    
    const token = response.data.idToken;
    return token;
}