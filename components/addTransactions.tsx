"use client";

import { toast } from "react-toastify";
import addTransaction from "../app/actions/addTransaction";
import { useRef } from "react";

const AddTransactions = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction added");
      formRef.current?.reset();
    }
  };

  return (
    <>
      <h3>Add Transactions</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text:</label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount: <br /> (negative - expense, positive - income)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount..."
            step="0.01"
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransactions;
