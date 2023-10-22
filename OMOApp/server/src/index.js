import { fetchData } from "./contract.js";
import express from "express";
import mongoose from './DBConn.mjs';
import router from "./Routers/users.js";
import axios from "axios";
import {fetchDaily, fetchMonthly, fetchWeekly} from "./StockGraph.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const port = process.env.PORT || 3001;

const RapidKey = process.env.RapidKey

app.get("/contract/:address", async (req, res) => {
    try {
        let contract = req.params.address;
        let fetched = await fetchData(contract);
        res.send(fetched);
    } catch (error) {
        console.error("Error fetching contract data:", error);
        res.status(500).send("Error fetching data");
    }
});

app.get('/api/search/:query', async (req, res) => {
    const query = req.params.query;
  
    const options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
      params: {
        symbol: query,
        outputsize: '30'
      },
      headers: {
        'X-RapidAPI-Key': RapidKey,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
        const filteredData = response.data.data.filter(entry => entry.country === "United States");
        console.log(filteredData);
        res.send({ data: filteredData });
    } catch (error) {
      console.error(error);
    }});

  app.get('/api/history_daily/:query', async(req, res) => {
    const query = req.params.query;

    try{
      const response = await fetchDaily(query);
      res.send(response);
    }
    catch(err){
      console.log("There was an error");
      console.error(err);
      res.status(500).send("Internal Server error");
    }

  })

  app.get('/api/history_weekly/:query', async(req, res) => {
    const query = req.params.query;

    try{
      const response = await fetchWeekly(query);
      res.json(response);
    }
    catch(err){
      console.log("There was an error");
      console.error(err);
      res.status(500).send("Internal Server error");
    }

  })

  app.get('/api/history_monthly/:query', async(req, res) => {
    const query = req.params.query;

    try{
      const response = await fetchMonthly(query);
      res.json(response);
    }
    catch(err){
      console.log("There was an error");
      console.error(err);
      res.status(500).send("Internal Server error");
    }

  })

app.use("/users", router);

app.listen(port, () => console.log(`Server listening at ${port}`));