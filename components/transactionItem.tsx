"use client";

import { Transaction } from "@/types/Transaction";
import { addCommas } from "@/app/actions/utils";
import { toast } from "react-toastify";
import deleteTransaction from "@/app/actions/deleteTransaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? "-" : "+";

  const handleDeletetransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
    }

    toast.success(message);
  };

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      <p>{transaction.text}</p>
      <span>
        {sign}₹{addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => handleDeletetransaction(transaction.id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default TransactionItem;
