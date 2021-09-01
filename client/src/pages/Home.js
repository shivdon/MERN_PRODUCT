import { Divider, Card } from "antd";
import React, { useEffect, useState } from "react";

import { listAllProducts } from "../functions/product";

import { EyeOutlined } from "@ant-design/icons";

import LoadingCard from "../components/cards/LoadingCard";

const { Meta } = Card;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    setLoading(true);
    listAllProducts()
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <h4 className="text-center mt-4">All Products</h4>
      <Divider />
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="row justify-content-evenly">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <Card
                  cover={
                    <img
                      src={
                        product.images &&
                        product.images.length > 0 &&
                        product.images[0].url
                      }
                      style={{ height: "200px", objectFit: "cover" }}
                      className="p-3"
                    />
                  }
                  actions={[
                    <a href={`/users/product/${product._id}`}>
                      <EyeOutlined className="text-primary" /> <br /> View
                      Product
                    </a>,
                  ]}
                >
                  <Meta
                    title={product.title}
                    description={`${
                      product.seo_description &&
                      product.seo_description.substring(0, 30)
                    }...`}
                  />
                </Card>
              </div>
            ))
          ) : (
            <h1 className="text-center text-danger">No Products Available</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
