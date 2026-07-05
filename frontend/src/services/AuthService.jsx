import api from "../api/axios";

export const loginUser = async (credentials) => {
    const response = await api.post(
        "api/token/",
        credentials
    );

    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post(
        "accounts/register/",
        userData
    );

    return response.data;
};