'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  addItemsToWishList,
} from "../../../../redux/reducers/ProductReducer";

const Product = ({params}) => {
  const product = useSelector((state) => state.products.product);
  const cartItems = useSelector((state) => state.products.cartItems);
  const wishListItems = useSelector((state) => state.products.wishList);

  const dispatch = useDispatch();

  console.log(`Product page:${params.productId} review:${params.review}` )

  useEffect(() => {
    console.log(product);
  }, []);

  const addToCart = (event, item) => {
    event.stopPropagation();

    let doesItemExist = false;
    if (cartItems.length > 0) {
      cartItems.forEach((ele, index) => {
        if (ele.id === item.id) doesItemExist = true;
      });
    }

    if (doesItemExist) toast.error("Item Already Exists");
    else {
      toast.success("Item added to cart");
      dispatch(addItemsToCart(item));
    }
  };

  const addToWishlist = (event, item) => {
    let doesItemExist = false;
    if (wishListItems.length > 0) {
      wishListItems.forEach((ele, index) => {
        if (ele.id === item.id) doesItemExist = true;
      });
    }

    if (doesItemExist) toast.error("Item Already Exists");
    else {
      toast.success("Item added to Wishlist");
      dispatch(addItemsToWishList(item));
    }
  };
  return (
    <>
      <div className="container">
        <div className="list-items">
          <div className="card">
            <img src={product?.thumbnail} alt="Product" />
            <div className="container">
              <div className="product-details">
                <span>{product?.title} </span>
                <div>Quantity: {product?.quantity ? product.quantity : 1}</div>
                <div>Price: ₹{product?.price}</div>
                <div>Stock: {product?.stock}</div>
                <div>Description: {product?.description}</div>
              </div>

              <div className="cart">
                <button
                  className="button"
                  onClick={(e) => addToCart(e, product)}
                >
                  Add to Cart
                </button>
                <button
                  className="button"
                  onClick={(e) => addToWishlist(e, product)}
                >
                  Add to WishList
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
