import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};


export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, loginData, {
      headers: { "Content-Type": "application/json" },
    });
    
    // The response.data should contain { id, name, email, ... }
    if (response.data && response.data.name) {
      return response.data;  // Return the full user object
    } else {
      throw new Error("User data is incomplete or missing.");
    }

  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


// export const loginUser = async (loginData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/users/login`, loginData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Login error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const fetchStocks = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/stocks`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching stocks:", error.response?.data || error.message);
//     throw error;
//   }
// };



// export const addStock = async (stockData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/stocks`, stockData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding stock:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const deleteStock = async (id) => {
//   try {
//     await axios.delete(`${API_BASE_URL}/stocks/${id}`);
//   } catch (error) {
//     console.error("Error deleting stock:", error.response?.data || error.message);
//     throw error;
//   }
// };



export const addExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expenseData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Expense saved successfully:", response.data); // Debugging log
 
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error.response?.data || error.message);
    throw error;
  }
}

export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/expenses/${id}`);
    console.log(`Expense with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting expense:", error.response?.data || error.message);
    throw error;
  }
};



export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses`); // Updated URL
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error.response?.data || error.message);
    throw error;
  }
};

// export const getAllBudgets = async()=>{
//   try {
//     const response = await axios.get(`${API_BASE_URL}/budgets`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching budgets:", error);
//     throw error;
//   }
// }

// export const getBudgetById = async (id) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/budgets/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching budget by ID:", error);
//     throw error;
//   }
// };
export const fetchBudget = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/budgets`);
    return response.data.length > 0 ? response.data[0] : null; // Return only first budget
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
};


export const editBudget = async (id, updatedBudgetAmount) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/budgets/${id}`, { budgetAmount: updatedBudgetAmount });
    return response.data;
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
};


export const addBudget = async (budgetAmount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/budgets`, { budgetAmount });
    return response.data;
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error;
  }
};

export const deleteBudget = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/budgets/${id}`);
  } catch (error) {
    console.error("Error deleting budget:", error);
    throw error;
  }
};


//portfolio

export const fetchStocks = async () => {
  const res = await fetch("http://localhost:8080/api/portfolio/all");
  return res.json();
};

export const addStock = async (stock) => {
  const res = await fetch("http://localhost:8080/api/portfolio/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
  return res.json();
};

export const editStock = async (id, stock) => {
  const res = await fetch(`http://localhost:8080/api/portfolio/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
  return res.json();
};

export const deleteStock = async (id) => {
  return fetch(`http://localhost:8080/api/portfolio/delete/${id}`, {
    method: "DELETE",
  });
};
