 import React, { useState ,useEffect} from "react";
 import "../style/Budget.css";
 import Navbar from "./Navbar";
 import { fetchExpenses,deleteExpense,addExpense } from "../api/api.js";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faTrash } from "@fortawesome/free-solid-svg-icons";
 import {  fetchBudget, editBudget, addBudget, deleteBudget } from "../api/api.js"
 import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
 
 
 const Budget = () => {
   
   const [showExpenseForm, setShowExpenseForm] = useState(false);
   const [expenses, setExpenses] = useState([{ name: "", amount: "" }]);
   const [expenseInputs, setExpenseInputs] = useState([{ name: "", amount: "" }]);
 

   const handleExpenseChange = (index, field, value) => {
     const updatedInputs = [...expenseInputs];
     updatedInputs[index][field] = value;
     setExpenseInputs(updatedInputs);
   };
 

  const addExpenseField = (name, amount) => {
    const newExpense = {
      id: Date.now(),
      name,
      amount,
      date: new Date().toISOString(), // Store exact creation time (static)
    };
    setExpenseInputs([...expenseInputs, newExpense]); // Update state with new expense
  
  };
  

   const handleDeleteInputExpense = (index) => {
     setExpenseInputs(expenseInputs.filter((_, i) => i !== index));
   };
 
  
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);  // Call API to delete from DB
      setExpenses(expenses.filter(expense => expense.id !== id)); // Remove from UI
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };
  
 
   const handleExpenseSubmit = async () => {
     const isValid = expenseInputs.every(expense => expense.name.trim() !== "" && expense.amount.trim() !== "");
   
     if (!isValid) {
       alert("Please fill in all expense fields before saving.");
       return;
     }
   
     try {
       await Promise.all(expenseInputs.map(expense => addExpense(expense)));
       console.log("Expenses Added:", expenseInputs);
   
       // Refresh the expenses list
       loadExpenses();
   
       // Reset form state
       setExpenseInputs([{ name: "", amount: "" }]);
       setShowExpenseForm(false);
     } catch (error) {
       console.error("Failed to save expenses:", error.message);
     }
   };
 
   const [budget, setBudget] = useState(null);
   const [newBudgetAmount, setNewBudgetAmount] = useState("");
   const [isEditing, setIsEditing] = useState(false);
   const [showBudgetForm, setShowBudgetForm] = useState(false);
  
   useEffect(() => {
     loadBudget();
   }, []);

 
 const loadBudget = async () => {
   try {
     const existingBudget = await fetchBudget();
     setBudget(existingBudget);
   } catch (error) {
     console.error("Failed to load budget");
   }
 };
 
 const handleBudgetSubmit = async (e) => {
   e.preventDefault();
   try {
     const newBudget = await addBudget(parseFloat(newBudgetAmount));
     setBudget(newBudget);
     setShowBudgetForm(false);
     setNewBudgetAmount("");
   } catch (error) {
     console.error("Error adding budget:", error);
   }
 };
 
 
 
const handleEditBudget = async () => {
  try {
    const updatedBudget = await editBudget(budget.id, parseFloat(newBudgetAmount));
    setBudget(updatedBudget);  // Update state with new budget from DB
    setIsEditing(false);
    setNewBudgetAmount("");
  } catch (error) {
    console.error("Error updating budget:", error);
  }
};
 
 
 const handleDeleteBudget = async () => {
   try {
     await deleteBudget(budget.id);
     setBudget(null);
   } catch (error) {
     console.error("Error deleting budget:", error);
   }
 };
 
 
 
   // Fetch from backend when the component mounts
 useEffect(() => {
   loadExpenses();
 }, []);
 
 const loadExpenses = async () => {
   try {
     const data = await fetchExpenses(); // Fetch data from backend
     setExpenses(data || []); // Ensure state doesn't break if response is undefined/null
     console.log("Expenses Loaded:", data); // Debugging log
   } catch (error) {
     console.error("Failed to load expenses:", error.response?.data || error.message);
   }
 };
 
 
   return (
     <div className="budget-body min-h-screen overflow-auto flex flex-col">
       {/* Navbar */}
       <div className="fixed top-0 w-full z-50">
         <Navbar />
       </div>
 
       {/* Main Container */}
       <div className="budget-content flex flex-row h-[calc(100vh-80px)] pt-20">
         {/* Left Panel */}
         <div className="left-section  w-[45%] p-6 shadow-lg rounded-lg">
           <h2 className="text-xl font-bold mb-4">Budget</h2>
           <div className="flex space-x-8 mb-6">4
           {/* {!budget && !showBudgetForm && ( */}
           {!budget &&   (
           <button
           
               onClick={() => setShowBudgetForm(true)}
               className="bg-blue-500 h-12 w-42 text-white px-4 py-2 rounded-md shadow-md"
             >
                 {/* <FaPlus /> */}
              + Add Budget
             </button>
            )}
 
          <button
            onClick={() => {
              setExpenseInputs([{ name: "", amount: "" }]); // Reset the form state
              setShowExpenseForm(true);
            }}
            className="bg-green-500 h-12 w-42 text-white px-4 py-2 rounded-md shadow-md"
          >   
          
          {/* <FaPlus /> */}
            + Add Expense
          </button>
           </div>

            {/* BUDGET CARD */}
 

<div className="budget-section absolute w-full justify-center mt-10">
  {budget && (
    <div className="budget-card bg-white shadow-xl p-8 rounded-2xl w-96 relative">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Budget Overview</h2>
      <p className="text-green-600 text-3xl font-semibold mb-1">₹{budget.budgetAmount}</p>
      <p className="text-sm text-gray-500 mb-4">{new Date().toLocaleString()}</p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-all"
          title="Edit Budget"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={handleDeleteBudget}
          className="p-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-full transition-all"
          title="Delete Budget"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  )}

  {isEditing && (
    <form
      onSubmit={handleEditBudget}
      className="bg-white shadow-xl p-8 rounded-2xl w-96 mt-6 relative"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Your Budget</h2>
      <input
        type="number"
        placeholder="Enter new budget (₹)"
        value={newBudgetAmount}
        onChange={(e) => setNewBudgetAmount(e.target.value)}
        className="border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 p-3 w-full rounded-lg text-lg outline-none"
        required
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white text-lg font-medium w-full py-3 mt-4 rounded-xl transition-all"
      >
        Update Budget
      </button>
    </form>
  )}
</div>

 

         </div>
 
         {/* Right Panel */}
         <div className="right-section w-[55%] p-6  shadow-lg rounded-lg  ">
           <h2 className="text-xl font-bold mb-4">Expenses</h2>
 
           {expenses.length > 0 ? (
   <table className="w-full border-collapse border border-gray-300">
     <thead>
       <tr>
         <th className="border p-2">S.No</th>
         <th className="border p-2">Expense Name</th>
         <th className="border p-2">Amount</th>
 
       </tr>
     </thead>
     <tbody>
            
{expenses.map((expense, index) => (
  <tr key={expense.id} className="text-center">
    <td className="border p-2">{index + 1}</td>
    <td className="border p-2">{expense.name}</td>
    <td className="border p-2">₹{expense.amount}</td>
 
    
    <td className="border p-2">
      <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-500 ml-2">
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </button>
    </td>
  </tr>
))}
 
           </tbody>
        </table>
       ) : (
         <p>No expenses added yet.</p>
       )}
  
         </div>
       </div>
 
       {/* Budget Form */}
       {showBudgetForm && (
         <div className="overlay">
           <div className="form-container">
             <h2>Add Budget</h2>
             <form onSubmit={handleBudgetSubmit}>
               <input
                 type="number"
                 name="budgetAmount"
                 placeholder="Budget Amount"
                 // value={newBudget.budgetAmount}
                 value={newBudgetAmount}
                 // onChange={handleBudgetChange}
                 onChange={(e) => setNewBudgetAmount(e.target.value)}
                 required
               />
               <div className="buttons">
                 <button type="submit">Save Budget</button>
                 <button type="button" onClick={() => setShowBudgetForm(false)}>Cancel</button>
               </div>
             </form>
           </div>
         </div>
       )}

      
      
       {/* Expense Form */}
       {showExpenseForm && (
         <div className="overlay">
           <div className="form-container">
             <h2>Add Expenses</h2>
  
 {expenseInputs.map((expense, index) => (
   <div key={index} className="expense-row">
     <input
       type="text"
       placeholder="Expense Name"
       value={expense.name}
       onChange={(e) => handleExpenseChange(index, "name", e.target.value)}
       required
     />
     <input
       type="number"
       placeholder="Amount"
       value={expense.amount}
       onChange={(e) => handleExpenseChange(index, "amount", e.target.value)}
       required
     />
     <button onClick={() => handleDeleteInputExpense (index)} className="text-red-500 ml-2">
       <FontAwesomeIcon icon={faTrash} />
     </button>
   </div>
 ))}
 
 
 
             <button className="add-expense-btn"
              onClick={addExpenseField}
           
              >+ Add More Expense</button>
             <div className="buttons">
               <button type="submit" onClick={handleExpenseSubmit}>Save</button>
               <button type="button" onClick={() => setShowExpenseForm(false)}>Cancel</button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };
 
 export default Budget;
 

