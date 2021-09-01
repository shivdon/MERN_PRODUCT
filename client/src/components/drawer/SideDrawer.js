import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Drawer, Button } from "antd";
import "./side-drawer.css";

const SideDrawer = () => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const handleCloseDrawer = () => {
    dispatch({
      type: "DRAWER_VISIBILITY",
      payload: false,
    });
  };

  return (
    <Drawer
      visible={drawer}
      onClose={handleCloseDrawer}
      title={<h2 className="product-title">CART</h2>}
      placement="right"
      closable={true}
      width={500}
    >
      {cart.map((product) => (
        <div className="row mb-5" key={product._id}>
          <div className="col-4">
            <img
              src={product && product.images && product.images[0].url}
              alt="Collar Picture"
              className="image"
            />
          </div>
          <div className="col-8">
            <h5 className="text-danger">Limited Stock</h5>
            <h4 className="product-title">{product.title && product.title}</h4>
            <h5 className="variant">{product.name}</h5>
            <div className="d-flex">
              <div className="me-auto d-flex">
                <Button
                  className="count"
                  onClick={() => {
                    if (count !== 1) {
                      setCount((prevState) => (prevState -= 1));
                    }
                  }}
                >
                  -
                </Button>
                <h5>{count}</h5>
                <Button
                  type="primary"
                  className="count"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  +
                </Button>
              </div>
              <div className="ms-auto">
                <h6 className="text-success">${product.variants[0].price}</h6>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button className="btn button buy-now" type="button">
        PROCEED TO BUY
      </button>
    </Drawer>
  );
};

export default SideDrawer;
