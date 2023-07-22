// App.js
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import TransactionTable from "./components/TransactionTable";
import TransactionForm from "./components/TransactionForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Fetch initial data from db.json or your API endpoint.
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Load transactions from local storage when the component mounts.
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  // Store transactions in local storage whenever the transactions state changes.
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTransaction) => {
    // Generate a unique ID using uuid
    const transactionWithId = { ...newTransaction, id: uuidv4() };
    setTransactions([...transactions, transactionWithId]);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const handleSort = (sortBy) => {
    const sortedTransactions = [...transactions];
  
    sortedTransactions.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a[sortBy]) - new Date(b[sortBy]);
      } else if (sortBy === "amount") {
        // Parse the amount values to numbers before sorting
        return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
      } else {
        return a[sortBy].localeCompare(b[sortBy]);
      }
    });
  
    setTransactions(sortedTransactions);
  };

  return (
    <div>
      <h1>Bank of Flatiron</h1>
      <SearchBar onSearch={setSearchTerm} />
      <TransactionTable
        transactions={transactions}
        searchTerm={searchTerm}
        onDeleteTransaction={handleDeleteTransaction}
        onSort={handleSort}
      />
      <TransactionForm onAddTransaction={handleAddTransaction} />
    </div>
  );
};

export default App;
