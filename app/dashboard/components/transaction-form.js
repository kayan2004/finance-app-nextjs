"use client";

import Label from "@/components/label";
import Select from "@/components/select";
import React from "react";
import { types, categories } from "@/lib/consts";
import Input from "@/components/input";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTransaction, updateTransaction } from "@/lib/actions";
import FormError from "@/components/form-error";
const TransactionForm = ({ initialData }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split("T")[0],
    },
  });

  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState();
  const type = watch("type");
  const editing = Boolean(initialData);

  const onSubmit = async (data) => {
    setSaving(true);
    setLastError();
    try {
      if (editing) {
        await updateTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }
      router.push("/dashboard");
    } catch (error) {
      setLastError(error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Type</Label>
          <Select
            {...register("type", {
              onChange: (e) => {
                if (e.target.value != "Expense") {
                  setValue("category", undefined);
                }
              },
            })}
          >
            {types.map((type) => {
              return <option key={type}>{type}</option>;
            })}
          </Select>
        </div>
        <div>
          <Label className="mb-1">Category</Label>
          <Select {...register("category")} disabled={type != "Expense"}>
            transactions
            <option value="">Select a category</option>
            {categories.map((category) => {
              return <option key={category}>{category}</option>;
            })}
          </Select>
        </div>
        <div>
          <Label className="mb-1">Date</Label>
          <Input {...register("created_at")} disabled={editing} />
          <FormError error={errors.created_at} />
        </div>
        <div>
          <Label className="mb-1">Amount</Label>
          <Input {...register("amount")} />
          <FormError error={errors.amount} />
        </div>
        <div>
          <Label className="mb-1 col-span-1 md:col-span-2">Description</Label>
          <Input
            {...register("description")}
            className=" col-span-1 md:col-span-2"
          />
          <FormError error={errors.description} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>{lastError && <FormError error={lastError} />}</div>
        <Button disabled={isSaving} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
