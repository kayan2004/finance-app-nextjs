"use client";
import Button from "./button";
import { deleteTransaction } from "@/lib/actions";
import { Loader, X } from "lucide-react";
import { useState } from "react";

const TransactionItemRemoveButton = ({ id, onRemoved }) => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState();
  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
    } finally {
      setLoading(false);
      onRemoved();
    }
  };
  return (
    <Button
      sizes="xs"
      variant={!confirmed ? "ghost" : "danger"}
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading ? (
        <X className="w-4 h-4" />
      ) : (
        <Loader className="w-4 h-4 animate-spin" />
      )}
    </Button>
  );
};

export default TransactionItemRemoveButton;
