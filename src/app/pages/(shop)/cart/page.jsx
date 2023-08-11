'use client'

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addItemsToWishList,
  decreaseQuantity,
  increaseQuantity,
  removeCartItems,
} from "../../../redux/reducers/ProductReducer";

const Cart = () => {
  const router = useRouter();
  const products = useSelector((state) => state.products.cartItems);
  const wishList = useSelector((state) => state.products.wishList);

  const dispatch = useDispatch();

  const removeItem = (id) => {
    console.log("removed", id);
    dispatch(removeCartItems(id));
  };

  const moveToWishList = (item) => {
    let doesItemExist = false;

    if (wishList?.length > 0) {
      wishList.forEach((ele, index) => {
        if (ele.id === item.id) doesItemExist = true;
      });
    }

    if (doesItemExist) {
      dispatch(removeCartItems(item.id));
    } else {
      dispatch(removeCartItems(item.id));
      dispatch(addItemsToWishList(item));
    }
  };

  const increase = (id) => {
    dispatch(increaseQuantity(id));
    console.log("increase ID", id);
  };

  const decrease = (id) => {
    dispatch(decreaseQuantity(id));
    console.log("decrease ID", id);
  };

  const proceedToCheckout = () => {
    // navigate("/checkout");
    router.push('/pages/checkout')
  };

  const getSum = () => {
    return products.reduce((acc, cur) => {
      if (cur.increasedPrice) return acc + cur.increasedPrice;
      else return acc + cur.price;
    }, 0);
  };
  const gotoWishlist = () => {
    // navigate("/wishlist");
    router.push('/pages/wishlist')
  };
  // useEffect(() => {
  //   console.log("cart items", products);
  // });
  return (
    <>
      <div className="container">
        <div className="list-items">
          {products?.length > 0 ? (
            products?.map((item, index) => (
              <div key={item.id} className="card">
                <img src={item?.thumbnail} alt="Product" />
                <div className="container">
                  <div className="product-details">
                    <span>{item?.title} </span>
                    <div>Quantity: {item?.quantity ? item.quantity : 1}</div>
                    <div>Price: ₹{item.price}</div>
                  </div>

                  <div className="cart">
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => increase(item.id)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => decrease(item.id)}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => moveToWishList(item)}
                    >
                      Move to WishList
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Cart is Empty</div>
          )}
        </div>

        <div className="actions-cart-wishlist">
          <div>
            {products?.length > 0 && (
              <div className="">
                <div style={{ margin: "5px", color : "#000" }}>Total: ₹{getSum()}</div>
                <button className="checkout" onClick={proceedToCheckout}>
                  Proceed to Checkout
                </button>
                <button className="checkout" onClick={gotoWishlist}>
                  Go to Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
