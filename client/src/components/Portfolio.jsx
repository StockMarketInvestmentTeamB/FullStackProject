  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { fetchStocks, addStock, editStock, deleteStock } from "../api/api.js";
  import Navbar from "./Navbar";
  import "../style/portfolio.css";
  import { FaEdit, FaTrash } from "react-icons/fa";
  import portfolioImage from "../style/portfolio.jpg"

  const Portfolio = () => {
    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentStockId, setCurrentStockId] = useState(null);
    const [stockData, setStockData] = useState({
      stockSymbol: "",
      quantity: "",
      purchasePrice: "",
    });
    // Mock current prices - in a real app, you'd fetch these from an API
    const [currentPrices, setCurrentPrices] = useState({
      AAPL: 175.25,
      MSFT: 325.12,
      GOOGL: 142.56,
      AMZN: 178.75,
      TSLA: 170.50
    });

    useEffect(() => {
      const loadStocks = async () => {
        try {
          const stocksData = await fetchStocks();
          setStocks(stocksData);
        } catch (error) {
          console.error("Error loading stocks", error);
        }
      };
      loadStocks();
    }, []);

    const handleChange = (e) => {
      setStockData({ ...stockData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editMode) {
          const updatedStock = await editStock(currentStockId, stockData);
          setStocks(
            stocks.map((stock) => (stock.id === currentStockId ? updatedStock : stock))
          );
        } else {
          const addedStock = await addStock(stockData);
          setStocks([...stocks, addedStock]);
        }
        setShowForm(false);
        setEditMode(false);
        setStockData({ stockSymbol: "", quantity: "", purchasePrice: "" });
      } catch (error) {
        console.error("Error submitting stock", error);
      }
    };

    const handleEdit = (stock) => {
      setStockData(stock);
      setCurrentStockId(stock.id);
      setEditMode(true);
      setShowForm(true);
    };

    const handleDelete = async (id) => {
      await deleteStock(id);
      setStocks(stocks.filter((stock) => stock.id !== id));
    };

    // Calculate gain/loss for a stock
    const calculateGainLoss = (stock) => {
      const currentPrice = currentPrices[stock.stockSymbol] || stock.purchasePrice;
      return (currentPrice - stock.purchasePrice) * stock.quantity;
    };

    // Get color class based on gain/loss value
    const getGainLossClass = (value) => {
      return value >= 0 ? "positive" : "negative";
    };

    return (
      <>
        <div className="portfolio-class">
          <Navbar />
          <div className="container-portfolio">
            <div className="Add-stock">
              <div className="add-icon">
                <h3>My Portfolio</h3>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => setShowForm(true)}
                ></i>
              </div>
              <div className="purchase-stock">
              <img src={portfolioImage} alt="" />
              </div>
            </div>

            <div className="stock-table">
              <h2>Your Assets</h2>
              <table>
                <thead>
                  <tr>
                    <th>Stock Symbol</th>
                    <th>Quantity</th>
                    <th>Purchase Price</th>
                    <th>Current Price</th>
                    <th>Total Value</th>
                    <th>Profit/Loss</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock, index) => {
                    const currentPrice = currentPrices[stock.stockSymbol] || stock.purchasePrice;
                    const gainLoss = calculateGainLoss(stock);
                    return (
                      <tr key={index}>
                        <td>{stock.stockSymbol}</td>
                        <td>{stock.quantity}</td>
                        <td>${stock.purchasePrice.toFixed(2)}</td>
                        <td>${currentPrice.toFixed(2)}</td>
                        <td>${(stock.quantity * stock.purchasePrice).toFixed(2)}</td>
                        <td className={getGainLossClass(gainLoss)}>
                          ${Math.abs(gainLoss).toFixed(2)} ({gainLoss >= 0 ? '↑' : '↓'})
                        </td>
                      

  <td className="actions">
    {/* <button 
      onClick={() => handleEdit(stock)} 
      className="icon-btn"
      aria-label="Edit"
    >
      <FaEdit />
    </button> */}
    <button 
      onClick={() => handleDelete(stock.id)} 
      className="icon-btn"
      aria-label="Delete"
    >
      <FaTrash />
    </button>
  </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {showForm && (
              <div className="overlay">
                <div className="form-container">
                  <h2>{editMode ? "Edit Stock" : "Add New Stock"}</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="stockSymbol"
                      placeholder="Stock Symbol"
                      value={stockData.stockSymbol}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      value={stockData.quantity}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="number"
                      name="purchasePrice"
                      placeholder="Purchase Price"
                      value={stockData.purchasePrice}
                      onChange={handleChange}
                      required
                    />
                    <div className="buttons">
                      <button type="submit">{editMode ? "Update" : "Add Stock"}</button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditMode(false);
                          setStockData({ stockSymbol: "", quantity: "", purchasePrice: "" });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );   
  };

  export default Portfolio;