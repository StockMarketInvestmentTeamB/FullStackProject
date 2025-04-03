import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addStock } from "../api/stockApi";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "../style/Theme.css";
import "../style/CompaniesCatlog.css"

const CompaniesCatalog = () => {
  const [exchange, setExchange] = useState("NSE");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/market/${exchange}`);
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
        if (exchange === "BSE") {
          setStocks(getSampleBseData());
          toast.info("Using sample BSE data as API response failed");
        } else {
          toast.error("Failed to fetch market data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [exchange]);

  const getSampleBseData = () => {
    return [
      {
        name: "SENSEX",
        price: "52800.50",
        change: "125.75",
        changePercent: "0.24",
        type: "INDEX"
      },
      {
        name: "RELIANCE",
        price: "2500.50",
        change: "25.75",
        changePercent: "1.03",
        type: "GAINER"
      },
      {
        name: "TATASTEEL",
        price: "120.75",
        change: "-1.25",
        changePercent: "-1.02",
        type: "LOSER"
      },
      {
        name: "HDFCBANK",
        price: "1500.25",
        change: "15.50",
        changePercent: "1.04",
        type: "GAINER"
      },
      {
        name: "ICICIBANK",
        price: "800.60",
        change: "-5.40",
        changePercent: "-0.67",
        type: "LOSER"
      },
      {
        name: "INFY",
        price: "1600.00",
        change: "20.00",
        changePercent: "1.25",
        type: "GAINER"
      }
    ];
  };

  const handleBuy = async (stock) => {
    try {
      await addStock({
        stockSymbol: stock.name,
        quantity: 1,
        purchasePrice: parseFloat(stock.price),
      });
      toast.success(`${stock.name} added to your portfolio!`);
      navigate("/portfolio");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="companies-catalog">
      <Navbar />
      <div className="container">
        {/* <div className="catalog-header">
          <h1 className="page-title">Stock Market</h1>
          <div className="exchange-toggle">
            <button
              className={`btn ${exchange === "NSE" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setExchange("NSE")}
            >
              NSE
            </button>
            <button
              className={`btn ${exchange === "BSE" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setExchange("BSE")}
            >
              BSE
            </button>
          </div>
        </div> */}

<div className="container">
    <div className="catalog-header">
      <h1 className="page-title">Stock Market</h1>
      <div className="exchange-toggle">
        <button
          className={`btn ${exchange === "NSE" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setExchange("NSE")}
        >
          NSE
        </button>
        <button
          className={`btn ${exchange === "BSE" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setExchange("BSE")}
        >
          BSE
        </button>
      </div>
      <a href="/market" className="btn btn-info know-more-btn">Know More</a>
    </div>
  </div>

       
        

        {loading ? (
          <div className="loading">Loading market data...</div>
        ) : (
          <div className="stocks-grid">
            {stocks.map((stock, index) => (
              <div key={index} className="card stock-card">
                <div className="stock-header">
                  <h3>{stock.name}</h3>
                  <span className={`tag ${
                    stock.type === "GAINER" ? "gainer" : 
                    stock.type === "LOSER" ? "loser" : "index"
                  }`}>
                    {stock.type}
                  </span>
                </div>
                <div className="stock-price">
                  ₹{parseFloat(stock.price).toFixed(2)}
                </div>
                <div className={`stock-change ${
                  parseFloat(stock.changePercent) >= 0 ? "positive" : "negative"
                }`}>
                  {parseFloat(stock.changePercent) >= 0 ? "+" : ""}
                  {stock.changePercent}%
                </div>
                <button 
                  className="btn btn-primary buy-btn"
                  onClick={() => handleBuy(stock)}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesCatalog;