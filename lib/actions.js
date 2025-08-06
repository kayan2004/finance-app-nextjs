"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transactionSchema } from "./validation";
export async function createTransaction(formData) {
  console.log(formData);
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data...");
  }
  const client = await createClient();
  const { error } = await client.from("transactions").insert(validated.data);
  if (error) {
    throw new Error("Failed to create the transaction...");
  }
  revalidatePath("/dashboard");
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
  const supabase = await createClient();

  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We cant fetch transactions");
  return data;
}

export async function deleteTransaction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(`We could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
}

export async function updateTransaction(id, formData) {
  console.log(formData);
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data...");
  }
  const client = await createClient();
  const { error } = await client
    .from("transactions")
    .update(validated.data)
    .eq("id", id);
  if (error) {
    throw new Error("Failed to create the transaction...");
  }
  revalidatePath("/dashboard");
}

export async function login(prevState, formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const { error } = supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) {
    return {
      error: true,
      message: "Error authenticating",
    };
  }
  return {
    message: `Email sent to ${email}`,
  };
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/login");
}
export async function uploadAvatar(prevState, formData) {
  const supabase = await createClient();
  const file = formData.get("file");
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);
  if (error) {
    return {
      error: true,
      message: "Error uploading avatar",
    };
  }

  // Removing the old file
  const { data: userData, userError } = await supabase.auth.getUser();
  if (userError) {
    return {
      error: true,
      message: "Something went wrong, try again",
    };
  }

  const avatar = userData.user.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from("avatars").remove([avatar]);

    if (error) {
      return {
        error: true,
        message: "Something went wrong, try again",
      };
    }
  }

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });
  if (dataUpdateError) {
    return {
      error: true,
      message: "Error associating the avatar with the user",
    };
  }

  return {
    message: "Updated the user avatar",
  };
}

export async function updateSettings(prevState, formData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: formData.get("fullName"),

      defaultView: formData.get("defaultView"),
    },
  });

  if (error) {
    return {
      error: true,

      message: "Failed updating setting",
    };
  }

  return {
    message: "Updated user settings",
  };
}
