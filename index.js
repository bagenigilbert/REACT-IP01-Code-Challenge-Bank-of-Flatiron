// creating  transactionTable.js file

import React, {useEffect, useState} from "react"

const transactionTable =()=>{
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
           </table>
        </div>
      )
    }