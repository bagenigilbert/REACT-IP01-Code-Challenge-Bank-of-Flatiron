// TransactionTable.js

import React from "react";

const TransactionTable = ({ transactions, searchTerm, onDeleteTransaction, onSort }) => {
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Transaction Table</h2>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => onSort("description")}>Description</button>
            </th>
            <th>
              <button onClick={() => onSort("amount")}>Amount</button>
            </th>
            <th>
              <button onClick={() => onSort("category")}>Category</button>
            </th>
            <th>
              <button onClick={() => onSort("date")}>Date</button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td>
                <button onClick={() => onDeleteTransaction(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
