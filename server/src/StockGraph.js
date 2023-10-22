
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const api_key = process.env.alphaKey;



async function fetchDaily(ticker){
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${api_key}`;

    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });

        const rawData = response.data['Time Series (Daily)'];

        if (!rawData) {
            console.error("Error: Time Series (Daily) data not found.");
            return {};
        }

        const formattedData = Object.entries(rawData).map(([date, values]) => ({
            date: date,
            close: parseFloat(values["4. close"])
        })).reverse();

        console.log(formattedData);
        return formattedData;

    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status} - ${error.response.statusText}`);
        } else {
            throw new Error(error.message);
        }
    }
}

async function fetchWeekly(ticker){
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ticker}&apikey=${api_key}`;

    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });

        const rawData = response.data['Weekly Time Series'];

        if (!rawData) {
            console.error("Error: Weekly Time Series data not found.");
            return {};
        }

        const formattedData = Object.entries(rawData).map(([date, values]) => ({
            date: date,
            close: parseFloat(values["4. close"])
        })).reverse();

        console.log(formattedData);
        return formattedData;

    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status} - ${error.response.statusText}`);
        } else {
            throw new Error(error.message);
        }
    }
}

async function fetchMonthly(ticker){
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${api_key}`;

    try {
        const response = await axios.get(url, {
            headers: {'User-Agent': 'request'}
        });

        const rawData = response.data['Monthly Time Series'];

        if (!rawData) {
            console.error("Error: Monthly Time Series data not found.");
            return {};
        }

        const formattedData = Object.entries(rawData).map(([date, values]) => ({
            date: date,
            close: parseFloat(values["4. close"])
        })).reverse();

        console.log(formattedData);
        return formattedData;

    } catch (error) {
        if (error.response) {
            throw new Error(`Status: ${error.response.status} - ${error.response.statusText}`);
        } else {
            throw new Error(error.message);
        }
    }
}

export {fetchDaily, fetchWeekly, fetchMonthly};