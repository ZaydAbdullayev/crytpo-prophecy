import axios from "axios";
const token = import.meta.env.VITE_COINGECKO_API_KEY;


export const getCryptoPrices = async (list) => {
    try {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': token }
        };
        const cryto_prices = JSON.parse(sessionStorage.getItem('crypto_prices')) || null;
        if (cryto_prices) {
            console.log(cryto_prices);
            return cryto_prices;

        }
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${list}&vs_currencies=usd`, options);
        sessionStorage.setItem('crypto_prices', JSON.stringify(response?.data));
        console.log(response.data);
        return response.data;

    } catch (error) {
        return error;
    }
}