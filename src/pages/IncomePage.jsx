import React, { useState, useEffect } from "react";

const IncomePage = () => {
    const [incomeType, setIncomeType] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    const [incomeDate, setIncomeDate] = useState(
        new Date().toISOString().slice(0, 10)
    ); // Set default value to today's date
    const [incomeTransactions, setIncomeTransactions] = useState([]);

    useEffect(() => {
        // Load income transactions from localStorage when the component mounts
        const storedIncomeTransactions = JSON.parse(
            localStorage.getItem("incomeTransactions") || "[]"
        );
        setIncomeTransactions(storedIncomeTransactions);
    }, []);

    const handleIncomeSubmit = (e) => {
        e.preventDefault();
        // Process the income transaction here
        const newIncomeTransaction = {
            id: Date.now(),
            type: incomeType,
            amount: parseFloat(incomeAmount),
            date: incomeDate,
        };

        setIncomeTransactions([...incomeTransactions, newIncomeTransaction]);
        setIncomeType("");
        setIncomeAmount("");
        setIncomeDate("");

        // Save income transactions to localStorage
        localStorage.setItem(
            "incomeTransactions",
            JSON.stringify([...incomeTransactions, newIncomeTransaction])
        );
    };

    const handleIncomeDelete = (id) => {
        // Remove the income transaction with the given id
        const updatedIncomeTransactions = incomeTransactions.filter(
            (transaction) => transaction.id !== id
        );
        setIncomeTransactions(updatedIncomeTransactions);

        // Save updated income transactions to localStorage
        localStorage.setItem(
            "incomeTransactions",
            JSON.stringify(updatedIncomeTransactions)
        );
    };

    return (
        <div className='section'>
            <h1>Income Page</h1>
            <form onSubmit={handleIncomeSubmit} className='form-group'>
                <input
                    type='text'
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                    placeholder='Enter income type'
                />
                <input
                    type='number'
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    placeholder='Enter income amount'
                />
                <input
                    type='date'
                    value={incomeDate}
                    onChange={(e) => setIncomeDate(e.target.value)}
                    placeholder='Select date'
                />
                <button type='submit'>Add Income</button>
            </form>

            {incomeTransactions.length === 0 ? (
                <p>No Income Added Yet</p>
            ) : (
                <ul>
                    {incomeTransactions.map((transaction) => (
                        <li key={transaction.id}>
                            Type: {transaction.type}, Amount:{" "}
                            {transaction.amount}, Date: {transaction.date}
                            <button
                                onClick={() =>
                                    handleIncomeDelete(transaction.id)
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

export default IncomePage;
