export const addToCart = (id, quantity, productQuantity) => {
  const existingCartItems = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );

  const existingCartItemIndex = existingCartItems.findIndex(
    (item) => item.id === id || (item.id && item.id.id === id)
  );

  // Check if the quantity exceeds the productQuantity limit
  if (quantity > productQuantity) {
    console.error("Quantity exceeds productQuantity limit");
    return;
  }

  if (existingCartItemIndex !== -1) {
    // If the item already exists, update the quantity if it doesn't exceed the limit
    const updatedQuantity =
      existingCartItems[existingCartItemIndex].quantity + quantity;

    // Check if the updated quantity exceeds the productQuantity limit
    if (updatedQuantity > productQuantity) {
      console.error("Quantity exceeds productQuantity limit");
      return;
    }

    existingCartItems[existingCartItemIndex].quantity = updatedQuantity;
  } else {
    // If the item doesn't exist, add a new item to the cart
    existingCartItems.push({
      id: typeof id === "string" ? id : { id },
      quantity,
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
};
