// creating transactionTable.js 

import React, { useState, useEffect } from "react";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <h2>Transaction Table</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, description, amount, category }) => (
            <tr key={id}>
              <td>{description}</td>
              <td>{amount}</td>
              <td>{category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
