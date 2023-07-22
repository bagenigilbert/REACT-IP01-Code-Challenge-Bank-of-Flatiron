import React, { useState, useEffect } from "react";
import TransactionTable from "./components/TransactionTable";
import TransactionForm from "./components/TransactionForm";
import SearchBar from "./components/SearchBar";
import "./App.css";
import data from "./data.json";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Load transactions from local storage when the component mounts
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || data.transactions;
    setTransactions(storedTransactions);
     setInitialDataLoaded(true);
  }, []);

  // Save transactions to local storage whenever they change
  useEffect(() => {
    if (initialDataLoaded) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, initialDataLoaded]);

  // Fetch initial data from db.json or your API endpoint after the initial data is loaded
  useEffect(() => {
    if (initialDataLoaded) {
      fetch("http://localhost:8001/transactions")
        .then((response) => response.json())
        .then((data) => setTransactions(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [initialDataLoaded]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      <h1>Bank of Flatiron</h1>
      <SearchBar onSearch={setSearchTerm} />
      <TransactionTable transactions={transactions} searchTerm={searchTerm} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
    </div>
  );
};

export default App;
