import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import CreateProductForm from "../../components/merchant/CreateProductForm";
import { saveProductToDatabase } from "../../functions/product";

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const [variantFields, setVariantFields] = useState([
    { name: "", price: 0, quantity: 0 },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event, index) => {
    const values = [...variantFields];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "price") {
      values[index].price = event.target.value;
    } else {
      values[index].quantity = event.target.value;
    }
    setVariantFields(values);
  };

  const handleAddFields = () => {
    const values = [...variantFields];
    values.push({ name: "", price: 0, quantity: 0 });
    setVariantFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...variantFields];
    values.splice(index, 1);
    setVariantFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      images.length === 0 ||
      variantFields.length === 0
    ) {
      alert("Please fill all the required Details");
      return;
    }

    const values = {
      title: title,
      description: description,
      images: images,
      variants: variantFields,
      seo_title: seoTitle,
      seo_description: seoDescription,
    };

    saveProductToDatabase(values)
      .then((res) => {
        console.log(res.data);
        toast.success("Product Created Successfully");
        history.push("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return user && user.role === "merchant" ? (
    <div className="text-center">
      <CreateProductForm
        variantFields={variantFields}
        setVariantFields={setVariantFields}
        handleInputChange={handleInputChange}
        handleAddFields={handleAddFields}
        handleRemoveFields={handleRemoveFields}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        images={images}
        setImages={setImages}
        seoTitle={seoTitle}
        setSeoTitle={setSeoTitle}
        seoDescription={seoDescription}
        setSeoDescription={setSeoDescription}
        loading={loading}
        setLoading={setLoading}
        handleSubmit={handleSubmit}
      />
    </div>
  ) : (
    <h4 className="text-center text-danger mt-4">403. Access Forbidden</h4>
  );
};

export default CreateProduct;
