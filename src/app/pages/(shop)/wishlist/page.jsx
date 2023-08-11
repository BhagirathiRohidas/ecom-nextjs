'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeWishlistItems,
} from "../../../redux/reducers/ProductReducer";
// import { useNavigate } from "react-router-dom";
import {useRouter} from 'next/navigation';

const WishList = () => {
  const wishList = useSelector((state) => state.products.wishList);
  const cartList = useSelector((state) => state.products.cartItems);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    console.log(wishList);
  }, []);

  const gotoCart = () => {
    // navigate("/cart");
    router.push('/pages/cart')
  };
  const removeItem = (id) => {
    console.log(`remove ${id}`);
    dispatch(removeWishlistItems(id));
  };

  const moveToCart = (item) => {
    let doesItemExist = false;

    if (cartList?.length > 0) {
      cartList.forEach((ele, index) => {
        if (ele.id === item.id) doesItemExist = true;
      });
    }

    if (doesItemExist) {
      dispatch(removeWishlistItems(item.id));
    } else {
      dispatch(removeWishlistItems(item.id));
      dispatch(addItemsToCart(item));
    }
  };

  return (
    <>
      <div className="container">
        <div className="list-items">
          {wishList?.length > 0 ? (
            wishList?.map((item, index) => (
              <div key={item.id} className="card">
                <img src={item.thumbnail} alt="Product" />
                <div className="container">
                  <span>{item.title}</span>
                  <div>₹:{item.price}</div>
                  <div className="cart">
                    <button
                      className="button"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                    <button className="button" onClick={() => moveToCart(item)}>
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Wishlist is Empty</div>
          )}
        </div>

        <div className="actions-cart-wishlist">
          <div>
            {cartList?.length > 0 && (
              <div className="">
                <button className="checkout" onClick={gotoCart}>
                  Go to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
