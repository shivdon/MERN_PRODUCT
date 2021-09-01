import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../functions/product";
import "./single-product.css";
import parser from "html-react-parser";
import { Tooltip } from "antd";
import ring from "../images/ring.jpg";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";

const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageNumber, setImageNumber] = useState(0);
  const [name, setName] = useState("Golden");
  const [tooltip, setTooltip] = useState("Add To Cart");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    //check whether the window for saving the product in local storage exists
    let cart = [];

    if (typeof window !== undefined) {
      //getting if any previous item exists in local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // spreading the product and adding a default value count
      cart.push({
        ...product,
        count: 1,
        name: name,
      });

      //removing duplicates using lodash
      let uniqueCartArray = lodash.uniqWith(cart, lodash.isEqualWith);

      localStorage.setItem("cart", JSON.stringify(uniqueCartArray));

      //dispatch to the redux store
      dispatch({
        type: "ADD_TO_CART",
        payload: uniqueCartArray,
      });
      setTooltip("Added");
    }
    // when item added to cart the drawer state should be true to be shown
    dispatch({
      type: "DRAWER_VISIBILITY",
      payload: true,
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    setLoading(true);
    getSingleProduct(match.params.id)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="wrapper">
        {loading ? (
          <LoadingOutlined className="text-center mx-auto my-auto" />
        ) : (
          <div className="row justify-content-evenly">
            <div className="col-md-6 col-sm-12 col-lg-6">
              <img
                src={
                  product && product.images && product.images[imageNumber].url
                }
                alt="Collar Picture"
                className="image"
              />
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6">
              <div className="content">
                <h5 className="text-danger">Limited Stock</h5>
                <h2 className="title-text">{product.title && product.title}</h2>
                <h6 className="text-success">
                  <span className="text-secondary">
                    <del>$6599</del>
                  </span>
                  {"     "}${product.variants && product.variants[0].price}
                </h6>
                <div className="description-text">
                  {product.description && parser(product.description)}
                </div>
                <div className="row justify-content-evenly text-center variant-row">
                  {product.variants &&
                    product.variants.map((variant) => (
                      <div className="col-4" key={variant.name}>
                        <img src={ring} alt="ring" className="bg-ring" />
                        <div
                          className={
                            name === variant.name
                              ? "box box-background-click"
                              : "box box-background"
                          }
                          onClick={() => {
                            setImageNumber(imageNumber === 0 ? 1 : 0);
                            setName(variant.name);
                          }}
                        >
                          <p className="variant-text">{variant.name}</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row justify-content-evenly mt-5">
                  <Tooltip
                    title={
                      user && user.email
                        ? tooltip
                        : "Please Login to Add Products to Cart"
                    }
                  >
                    <div className="col-6">
                      <button
                        className="btn button cart-button"
                        type="button"
                        disabled={user && user.email ? false : true}
                        onClick={() => handleAddToCart()}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </Tooltip>
                  <div className="col-6">
                    <button className="btn button buy-now" type="button">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
