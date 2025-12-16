import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Spinner, Alert } from "reactstrap";
import Header from "./Header";

// 🔹 use DB thunks
import {
  fetchCartDB,
  removeFromCartDB,
} from "../Features/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error } = useSelector((state) => state.cart);

  const USER_ID = "123"; // temporary (replace later with auth user)

  // 🔹 Fetch cart from database on page load
  useEffect(() => {
    dispatch(fetchCartDB(USER_ID));
  }, [dispatch]);

  // 🔹 Remove item from DB + Redux
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCartDB(itemId));
  };

  // 🔹 Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // 🔹 Go to payment page
  const handleConfirmOrder = () => {
    navigate("/payment");
  };

  return (
    <div>
      <Header />
      <h2 className="text-center mt-3">Your Cart</h2>

      {status === "loading" && (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      )}

      {error && <Alert color="danger">{error}</Alert>}

      {items.length === 0 && status === "succeeded" ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Table striped responsive className="mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity || 1}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="text-end me-3">
            Total Price: ${totalPrice}
          </h4>

          <div className="text-center mb-4">
            <Button color="success" onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
