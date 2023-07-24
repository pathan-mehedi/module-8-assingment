import React, { useState } from 'react';

const ExpenseForm = ({ addExpenseTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'expense',
      description,
      amount: parseFloat(amount),
    };
    addExpenseTransaction(newTransaction);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
