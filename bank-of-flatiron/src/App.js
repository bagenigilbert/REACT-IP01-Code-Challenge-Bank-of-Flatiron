import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TransactionTable from "./components/TransactionTable";
import TransactionForm from "./components/TransactionForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Fetch initial data from localStorage when the component mounts.
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    if (storedTransactions.length === 0) {
      // If there is no data in localStorage, fetch data from API (http://localhost:8001/transactions)
      fetch("http://localhost:8001/transactions")
        .then((response) => response.json())
        .then((data) => {
          // Assign unique IDs using uuid
          const transactionsWithIds = data.map((transaction) => ({ ...transaction, id: uuidv4() }));
          setTransactions(transactionsWithIds);
          localStorage.setItem("transactions", JSON.stringify(transactionsWithIds));
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      // If there is data in localStorage, use it directly
      setTransactions(storedTransactions);
    }
  }, []);

  // Store transactions in localStorage whenever the transactions state changes.
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
        return a[sortBy] - b[sortBy]; // Assuming amount is a number, not a string
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
