// App.js
import React, { useState, useEffect } from "react";
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

  const handleAddTransaction = (newTransaction) => {
    // In a real application, you would typically make an API call to save the newTransaction data to the server.
    // For this example, we will update the transactions state directly.
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id) => {
    // Remove the transaction with the given id from the transactions array.
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const handleSort = (sortBy) => {
    // Sort the transactions array based on the selected sorting option (category or description).
    const sortedTransactions = [...transactions];
    sortedTransactions.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
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
