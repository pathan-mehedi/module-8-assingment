import React, { useState } from 'react';

const IncomeForm = ({ addIncomeTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'income',
      description,
      amount: parseFloat(amount),
    };
    addIncomeTransaction(newTransaction);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;
