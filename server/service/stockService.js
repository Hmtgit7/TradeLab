const axios = require('axios');
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

async function fetchStockPrice(ticker) {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: ticker,
        apikey: apiKey,
      },
    });
    const data = response.data["Global Quote"];
    if (!data || !data["05. price"]) {
      throw new Error('No price data found');
    }
    return {
      symbol: ticker,
      price: parseFloat(data["05. price"]),
      raw: data
    };
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

module.exports = { fetchStockPrice };
