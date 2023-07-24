import React, { useState, useEffect } from "react";

const ExpensePage = () => {
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState(
        new Date().toISOString().slice(0, 10)
    ); // Set default value to today's date
    const [expenseTransactions, setExpenseTransactions] = useState([]);

    useEffect(() => {
        // Load expense transactions from localStorage when the component mounts
        const storedExpenseTransactions = JSON.parse(
            localStorage.getItem("expenseTransactions") || "[]"
        );
        setExpenseTransactions(storedExpenseTransactions);
    }, []);

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        // Process the expense transaction here
        const newExpenseTransaction = {
            id: Date.now(),
            name: expenseName,
            amount: parseFloat(expenseAmount),
            date: expenseDate,
        };

        setExpenseTransactions([...expenseTransactions, newExpenseTransaction]);
        setExpenseName("");
        setExpenseAmount("");
        setExpenseDate("");

        // Save expense transactions to localStorage
        localStorage.setItem(
            "expenseTransactions",
            JSON.stringify([...expenseTransactions, newExpenseTransaction])
        );
    };

    const handleExpenseDelete = (id) => {
        // Remove the expense transaction with the given id
        const updatedExpenseTransactions = expenseTransactions.filter(
            (transaction) => transaction.id !== id
        );
        setExpenseTransactions(updatedExpenseTransactions);

        // Save updated expense transactions to localStorage
        localStorage.setItem(
            "expenseTransactions",
            JSON.stringify(updatedExpenseTransactions)
        );
    };

    return (
        <div className='section'>
            <h1>Expense Page</h1>
            <form onSubmit={handleExpenseSubmit} className='form-group'>
                <input
                    type='text'
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    placeholder='Enter expense name'
                />
                <input
                    type='number'
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder='Enter expense amount'
                />
                <input
                    type='date'
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    placeholder='Select date'
                />
                <button type='submit'>Add Expense</button>
            </form>

            {expenseTransactions.length === 0 ? (
                <p>No Expenses Added Yet</p>
            ) : (
                <ul>
                    {expenseTransactions.map((transaction) => (
                        <li key={transaction.id}>
                            Name: {transaction.name}, Amount:{" "}
                            {transaction.amount}, Date: {transaction.date}
                            <button
                                onClick={() =>
                                    handleExpenseDelete(transaction.id)
                                }
                                className='del_btn'>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpensePage;
