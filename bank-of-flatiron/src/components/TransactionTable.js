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
              <button onClick={() => onSort("description")} className="button-85">Description</button>
            </th>
            <th>
              <button onClick={() => onSort("amount")} className="button-85">Amount</button>
            </th>
            <th>
              <button onClick={() => onSort("category")} className="button-85">Category</button>
            </th>
            <th>
              <button onClick={() => onSort("date")} className="button-85">Date</button>
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
                <button onClick={() => onDeleteTransaction(transaction.id)} className="button-78">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;