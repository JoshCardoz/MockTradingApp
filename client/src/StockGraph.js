import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, LineChart, ResponsiveContainer } from 'recharts';

function StockGraph( {ticker} ) {
    const [timeInterval, setTimeInterval] = useState('daily');
    const [dataPoints, setDataPoints] = useState([]);
    

    useEffect(() => {
        const fetchGraphData = async () => {
            let endpoint;
            switch(timeInterval) {
                case 'weekly':
                    endpoint = `/api/history_weekly/${ticker}`;
                    break;
                case 'monthly':
                    endpoint = `/api/history_monthly/${ticker}`;
                    break;
                case 'daily':
                default:
                    endpoint = `/api/history_daily/${ticker}`;
            }
            
            try {
                const response = await axios.get(endpoint);
                setDataPoints(response.data);
                console.log(response.data);
                console.log(`Fetched ${timeInterval} data...`);
            } catch (error) {
                console.error("Error fetching the data", error);
            }
        };

        fetchGraphData();
    }, [ticker, timeInterval]);

    return (
        <div>
            <div style={{ marginBottom: "20px" , marginTop: "5px"}}>
                <button 
                    onClick={() => setTimeInterval('daily')}
                    style={{
                        marginRight: "10px",
                        borderRadius: "5px",
                        backgroundColor: timeInterval === 'daily' ? "#8884d8" : "#e0e0e0",
                        padding: "10px 15px"
                    }}
                >
                    D
                </button>
                <button 
                    onClick={() => setTimeInterval('weekly')}
                    style={{
                        marginRight: "10px",
                        borderRadius: "5px",
                        backgroundColor: timeInterval === 'weekly' ? "#8884d8" : "#e0e0e0",
                        padding: "10px 15px"
                    }}
                >
                    W
                </button>
                <button 
                    onClick={() => setTimeInterval('monthly')}
                    style={{
                        borderRadius: "5px",
                        backgroundColor: timeInterval === 'monthly' ? "#8884d8" : "#e0e0e0",
                        padding: "10px 15px"
                    }}
                >
                    M
                </button>
            </div>
            
            <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart data={dataPoints}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
        

        
    );    
}

export default StockGraph;
