"use client";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addItemsToCart,
  addItemsToWishList,
  renderSingleItem,
} from "../../redux/reducers/ProductReducer";
import { toast } from "react-toastify";

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const products = useSelector((state) => state.products.cartItems);
  const wishListItems = useSelector((state) => state.products.wishList);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getData = async () => {
    await fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  const addToCart = (event, item) => {
    event.stopPropagation();

    let doesItemExist = false;
    if (products.length > 0) {
      products.forEach((ele, index) => {
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
    event.stopPropagation();

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

  const goToCart = () => {
    // navigate("/cart");
    router.push("/pages/cart");
  };

  const gotoWishlist = () => {
    // navigate("/wishlist");
    router.push("/pages/wishlist");
  };

  useEffect(() => {
    console.log("available products", products);
    getData();
  }, []);

  (function () {
    // …
    getData();
  })();

  const renderItem = (event, item) => {
    // navigate("/product");
    console.log(item);
    router.push(`/pages/products/${item.id}`);
    dispatch(renderSingleItem(item));
  };

  return (
    <>
      <div className="container">
        <div className="list-items">
          {data?.products?.length > 0 &&
            data.products.map((item, index) => (
              <div
                key={item.id}
                className="card"
                onClick={(e) => renderItem(e, item)}
              >
                <img src={item.thumbnail} alt="Product" />
                <div className="">
                  <div className="product-details">
                    <span>{item.title}</span>
                    <div>Price: ₹{item.price}</div>
                  </div>

                  <div className="cart">
                    <button
                      className="button"
                      onClick={(e) => addToCart(e, item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="button"
                      onClick={(e) => addToWishlist(e, item)}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="actions-cart-wishlist">
          <div>
            <button
              type="button"
              className="goto-cart"
              onClick={() => goToCart()}
            >
              Go to Cart ({products.length})
            </button>
          </div>
          <div>
            <button className="goto-wishlist" onClick={() => gotoWishlist()}>
              Go To Wishlist ({wishListItems.length})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
