import React, { useState, useEffect } from 'react';
import { UserCircle, Sun, Moon } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [financeNews, setFinanceNews] = useState([]); // State for finance news

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false")
      .then(res => res.json())
      .then(data => setCryptoPrices(data));
  }, []);

  useEffect(() => {
    const fetchFinanceNews = async () => {
      try {
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations?symbol=INTC',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': '2ca41326admshe54f412f607b0f2p124fbcjsn4edd60c8b068', // Your API key
              'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch finance news: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Log the API response to inspect its structure

        const recommendations = data.finance?.result?.[0]?.recommendedSymbols || [];
        if (recommendations.length > 0) {
          setFinanceNews(recommendations);
        } else {
          throw new Error('No finance news available');
        }
      } catch (error) {
        console.error('Error fetching finance news:', error);

        // Fallback to mock data
        const mockFinanceNews = [
          { symbol: 'AAPL', shortName: 'Apple Inc.' },
          { symbol: 'MSFT', shortName: 'Microsoft Corporation' },
          { symbol: 'GOOGL', shortName: 'Alphabet Inc.' },
        ];
        setFinanceNews(mockFinanceNews);
      }
    };

    fetchFinanceNews();
  }, []);

  const seiAnomalies = [
    { date: '2024-02-15', price: 0.8799 },
    { date: '2024-02-16', price: 0.9323 },
    { date: '2024-02-17', price: 0.9335 },
    { date: '2024-02-18', price: 0.9079 },
    { date: '2024-02-19', price: 0.9638 },
    { date: '2024-02-20', price: 0.9227 },
    { date: '2024-02-21', price: 0.9348 },
    { date: '2024-02-22', price: 0.8757 },
    { date: '2024-02-25', price: 0.8587 },
    { date: '2024-02-27', price: 0.8904 },
    { date: '2024-02-28', price: 0.8901 },
    { date: '2024-02-29', price: 0.869 },
    { date: '2024-03-02', price: 0.8591 },
    { date: '2024-03-03', price: 0.8485 },
    { date: '2024-03-08', price: 0.9497 },
    { date: '2024-03-09', price: 0.9302 },
    { date: '2024-03-10', price: 0.9029 },
    { date: '2024-03-11', price: 0.8682 },
    { date: '2024-03-12', price: 0.8977 },
    { date: '2024-03-13', price: 0.9026 },
    { date: '2024-03-14', price: 0.8988 },
    { date: '2024-03-15', price: 0.8676 },
    { date: '2024-03-16', price: 1.0407 },
    { date: '2024-03-17', price: 0.8986 },
    { date: '2024-03-18', price: 0.9017 },
    { date: '2024-03-21', price: 0.8677 },
    { date: '2024-03-28', price: 0.8946 },
    { date: '2024-03-29', price: 0.8656 },
  ];

  const seiCoin = {
    id: "sei-coin",
    name: "SEI Coin",
    current_price: 1.05
  };

  const themeClass = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';

  const handleEarnReward = () => {
    setRewardPoints(prev => prev + 10);
  };

  return (
    <div className={`min-vh-100 p-4 ${themeClass}`}>
      <div className="bg-primary rounded p-4 d-flex justify-content-between align-items-center mb-4 shadow">
        <h1 className="h4 fw-bold mb-0">Finance Dashboard</h1>
        <div className="d-flex gap-3 align-items-center">
          <button onClick={() => setDarkMode(!darkMode)} className="btn btn-outline-light rounded-circle">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="rounded-circle bg-white d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
            <UserCircle className="text-primary" size={24} />
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column */}
        <div className="col-12 col-md-6 d-flex flex-column gap-3">
          {/* SEI Anomalies - Scrollable */}
          <div className={`rounded p-3 shadow flex-grow-1 ${darkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`} style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <p className="fw-semibold mb-3">📌 SEI Anomalies</p>
            <div className="d-flex flex-column gap-2">
              {seiAnomalies.map((item, i) => (
                <div key={i} className={`p-2 rounded shadow-sm ${darkMode ? 'bg-dark text-white-50' : 'bg-white text-dark'}`} onClick={handleEarnReward}>
                  <p className="fw-medium mb-1">Close: ${item.price.toFixed(4)}</p>
                  <small className="text-muted">Date: {item.date}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Report Button */}
          <button className="btn btn-warning text-dark fw-semibold shadow" style={{ height: '50px', fontSize: '1.5rem' }}>Report</button>

          {/* Top Crypto Prices */}
          <div className={`rounded p-3 shadow ${darkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`}>
            <p className="fw-semibold mb-3">💹 Top Crypto Prices</p>
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              {cryptoPrices.map((coin, index) => (
                <div key={index} className={`border rounded p-2 shadow-sm ${darkMode ? 'bg-dark text-white-50' : 'bg-white text-dark'}`} style={{ minWidth: '150px', maxWidth: '180px' }}>
                  <div className="fw-semibold">{coin.name}</div>
                  <div>${coin.current_price.toFixed(2)}</div>
                </div>
              ))}
              {/* Manually Add SEI */}
              <div className={`border rounded p-2 shadow-sm ${darkMode ? 'bg-dark text-white-50' : 'bg-white text-dark'}`} style={{ minWidth: '150px', maxWidth: '180px' }}>
                <div className="fw-semibold">{seiCoin.name}</div>
                <div>${seiCoin.current_price.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Rewards */}
          <div className={`rounded p-3 shadow ${darkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`}>
            <p className="fw-semibold mb-3">🏆 Rewards</p>
            <div className="d-flex flex-column gap-2">
              <div className="p-3 rounded shadow-sm" style={{ backgroundColor: darkMode ? '#444' : '#f8f9fa' }}>
                <p className="fw-medium">Your Reward Points: <strong>{rewardPoints}</strong></p>
                <p className="small">Earn points by interacting with anomalies and crypto prices.</p>
              </div>
              <button className="btn btn-warning" onClick={() => setRewardPoints(0)}>Claim Rewards</button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-12 col-md-6 d-flex flex-column gap-3">
          {/* Chart */}
          <div className={`rounded p-3 shadow ${darkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`}>
            <p className="fw-semibold mb-3">📈 SEI Price with Anomalies</p>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={seiAnomalies}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="date" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" domain={[0.8, 1.1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#00BFFF" strokeWidth={3} name="SEI Price" />
                  <Scatter data={seiAnomalies.filter(d => d.price > 0.95)} fill="#FF0000" name="Anomalies" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-danger mt-2 small">⚠️ High-value anomalies from Feb–Mar 2024</p>
          </div>

          {/* Finance News */}
          <div className={`rounded p-3 shadow ${darkMode ? 'bg-secondary text-white' : 'bg-light text-dark'}`}>
            <p className="fw-semibold mb-3">📰 Finance News</p>
            <div className="d-flex flex-row gap-3 overflow-auto">
              {financeNews.map((news, i) => (
                <div key={i} className={`rounded p-3 ${darkMode ? 'bg-dark' : 'bg-white'}`} style={{ minWidth: '250px', maxWidth: '250px', flexShrink: 0 }}>
                  <p className="fw-medium">{news.symbol}</p>
                  <small className="text-muted">{news.shortName}</small>
                  <div className="mt-2">
                    <a
                      href={`https://finance.yahoo.com/quote/${news.symbol}`}
                      className="btn btn-link text-primary p-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}