// Author: hemant gehlod (Hmtgit7)
import apiClient from "../services/apiClient";

export const getStockDetails = async (symbol) => {
    try {
        const response = await apiClient.get(
            `/transaction/stock-balance?ticker=${symbol}`
        );
        console.log("Get stock details data: ", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching stock details:", error);
        throw error;
    }
};

export const getUserBalance = async () => {
    try {
        const response = await apiClient.get("/auth/profile");
        console.log("Get user balance data: ", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching user balance:", error);
        throw error;
    }
};

// Fetch live stock price from backend
export const getLiveStockPrice = async (symbol) => {
    try {
        const response = await apiClient.get(`/transaction/live-stock-price?ticker=${symbol}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching live stock price:", error);
        throw error;
    }
};
