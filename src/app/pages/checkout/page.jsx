'use client'
import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/reducers/ProductReducer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const addedItems = useSelector((state) => state.products.cartItems);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(addedItems);
  }, []);

  const handleSubmit = () => {
    dispatch(reset());
    // navigate("/");
    router.push('/')
    toast.success("Order Placed!");
  };

  const getSum = () => {
    return addedItems.reduce((acc, cur) => {
      if (cur.increasedPrice) return acc + cur.increasedPrice;
      else return acc + cur.price;
    }, 0);
  };
  return (
    <>
      <div className="container">
        <div className="list-items">
          <div className="confirm-purchase">
            {addedItems?.length > 0 ? (
              addedItems?.map((item, index) => (
                <div key={item.id} className="order-list">
                  {/* <img
                    src={item.thumbnail}
                    alt="Product"
                    style={{ width: "50px", height: "50px" }}
                  /> */}
                  <div className="order-list-item">{item.title} </div>
                  <div className="order-list-item">
                    Qnt: {item?.quantity ? item.quantity : 1}
                  </div>
                  <div className="order-list-item">
                    Price: ₹
                    {item.increasedPrice ? item.increasedPrice : item.price}
                  </div>
                </div>
              ))
            ) : (
              <div>There is nothing to checkout. Add Items!</div>
            )}
          </div>

          <div className="">
            <div>
              {addedItems?.length > 0 && (
                <div>
                  <div style={{ margin: "5px", justifyContent: "center" }}>
                    Total: ₹{getSum()}
                  </div>
                  <button className="buy-button" onClick={() => handleSubmit()}>
                    Confirm Purchase
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
