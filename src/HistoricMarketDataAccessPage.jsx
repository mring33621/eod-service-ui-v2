import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./NavBar.jsx";

const HistoricMarketDataAccessPage = () => {
    const [exchanges, setExchanges] = useState([]);
    const [selectedExchange, setSelectedExchange] = useState('select an exchange to start');
    const [symbols, setSymbols] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/md/exchanges')
            .then(response => {
                setExchanges(response.data);
            });
    }, []);

    useEffect(() => {
        if (selectedExchange !== 'select an exchange to start') {
            setData([]); // Clear the data when the exchange changes
        }
    }, [selectedExchange]);

    const handleExchangeChange = (event) => {
        setSelectedExchange(event.target.value);
        if (event.target.value !== 'select an exchange to start') {
            axios.get(`/md/${event.target.value}/top10symbols`)
                .then(response => {
                    setSymbols(response.data);
                });
        } else {
            setSymbols([]);
        }
    };

    const handleSymbolChange = (event) => {
        setSelectedSymbol(event.target.value);
        axios.get(`/md/${event.target.value}/points`)
            .then(response => {
                setData(response.data);
            });
    };

    return (
        <div>
            <Navbar/>
            <select onChange={handleExchangeChange}>
                <option value="select an exchange to start">select an exchange to start</option>
                {exchanges.map((exchange, index) => (
                    <option key={index} value={exchange}>{exchange}</option>
                ))}
            </select>
            <select onChange={handleSymbolChange}>
                {symbols.map((symbol, index) => (
                    <option key={index} value={symbol}>{symbol}</option>
                ))}
            </select>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Symbol</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.symbol}</td>
                        <td>{item.open}</td>
                        <td>{item.high}</td>
                        <td>{item.low}</td>
                        <td>{item.close}</td>
                        <td>{item.volume}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoricMarketDataAccessPage;