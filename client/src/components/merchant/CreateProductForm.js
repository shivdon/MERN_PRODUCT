import { Divider, Select } from "antd";
import React, { Fragment } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./create-product-form.css";

import FileUpload from "./FileUpload";

const { Option } = Select;

const CreateProductForm = ({
  variantFields,
  setVariantFields,
  handleInputChange,
  handleAddFields,
  handleRemoveFields,
  title,
  setTitle,
  description,
  setDescription,
  images,
  setImages,
  seoTitle,
  setSeoTitle,
  seoDescription,
  setSeoDescription,

  loading,
  setLoading,
  imageShow,
  handleSubmit,
}) => {
  return (
    <div>
      <h4 className="mt-4">Add New Product</h4>
      <Divider />
      <section className="container-fluid text">
        <section className="row justify-content-center">
          <section className="col-12 col-md-4 col-sm-6">
            <form className="form-container" onSubmit={handleSubmit}>
              <div className="form-element">
                <h6>Product title</h6>
                <div className="form-group">
                  <input
                    className="form-input form-control"
                    type="text"
                    placeholder="Enter Title Here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    minLength="4"
                  />
                </div>
              </div>
              <div className="form-element">
                <h6>Product Description</h6>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(value) => setDescription(value)}
                ></ReactQuill>
              </div>

              <FileUpload
                images={images}
                setImages={setImages}
                loading={loading}
                setLoading={setLoading}
              />

              <div className="form-element">
                <h6>Product Variant</h6>
                <p>
                  This product has multiple options, like different sizes or
                  colors
                </p>
                <Select
                  placeholder="Select Variant Type"
                  className="form-input form-control"
                >
                  <Option value="size">Size</Option>
                  <Option value="color">Color</Option>
                </Select>
              </div>
              <div className="form-element">
                <div className="row">
                  {variantFields.length > 0 &&
                    variantFields.map((vf, index) => (
                      <Fragment key={`${variantFields}~${index}`}>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-element">
                            <h6>Variant</h6>
                            <input
                              className="form-input form-control"
                              type="text"
                              placeholder="name"
                              name="name"
                              value={variantFields.name}
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-element">
                            <h6>Price</h6>
                            <input
                              className="form-input form-control"
                              type="text"
                              placeholder="$"
                              name="price"
                              value={variantFields.price}
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-element">
                            <h6>Quantity</h6>
                            <input
                              className="form-input form-control"
                              type="text"
                              placeholder="0"
                              name="quantity"
                              value={variantFields.quantity}
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm mt-3 mb-3"
                          onClick={() => handleRemoveFields(index)}
                        >
                          - Remove variant Type
                        </button>
                      </Fragment>
                    ))}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-dark btn-sm mt-2"
                onClick={() => handleAddFields()}
              >
                + Add Variant Type
              </button>

              <div className="form-element mt-5">
                <h6>SEO Meta Details</h6>
                <div className="form-group">
                  <input
                    className="form-input form-control"
                    type="text"
                    placeholder="SEO title"
                    maxLength="60"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                  />
                  <textarea
                    className="form-input form-control mt-4"
                    rows="5"
                    placeholder="SEO description"
                    maxLength="260"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-dark mt-2 butn"
                onClick={handleSubmit}
              >
                Add product
              </button>
            </form>
          </section>
        </section>
      </section>
    </div>
  );
};

export default CreateProductForm;
