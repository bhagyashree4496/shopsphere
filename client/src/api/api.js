import { port } from "../env";
export const getProducts = async () => {
  const response = await fetch(`${port}/api/products/get`); // Replace with your API URL
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
export const getProductById = async (id) => {
  const response = await fetch(`${port}/api/products/get/${id}`); // Replace with your API URL
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
export const getProductByIds = async (items, type) => {
  const response = await fetch(`${port}/api/products/getbyids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems: items, type: type }),
  }); // Replace with your API URL
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
export const createUserDetails = async (uid, name, address, phone, email) => {
  const userDetails = {
    uid: uid, // Replace with the user's UID
    name: name,
    address: address,
    phoneNumber: phone,
    email: email,
  };

  try {
    const response = await fetch(`${port}/api/user/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
export const updateUserDetails = async (uid, details) => {
  try {
    const response = await fetch(`${port}/api/user/update-user/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getuserByUid = async (uid) => {
  const response = await fetch(`${port}/api/user/${uid}`); // Replace with your API URL
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
