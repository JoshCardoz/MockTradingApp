import axios from 'axios';
import alphaKey from "dotenv";


const apiKey = process.env.alphaKey;

async function fetchData(ticker) {

    try {
      const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/price',
        params: {
          symbol: ticker,
          format: 'json',
          outputsize: '30'
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };

        const response = await axios.request(options);

        const result = {
            stockTicker : ticker,
            stockPrice : response.data.price
        };
        
        
        return result;
    } catch (error) {
        console.error("Error getting Stock data:", error);
        throw error;
    }
}


export {fetchData};