import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import { Avatar, Badge } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ images, setImages, setLoading, loading }) => {
  const handleFileUploadAndResize = (e) => {
    //resize
    setLoading(true);
    let files = e.target.files;
    let allUploadedImages = images;

    for (let i = 0; i < files.length; i++) {
      Resizer.imageFileResizer(
        files[i],
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri })
            .then((res) => {
              allUploadedImages.push(res.data);
              setImages(allUploadedImages);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("CLOUDINARY ERROR: ", err);
            });
        },
        "base64"
      );
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API}/removeimages`, { public_id })
      .then((res) => {
        setLoading(false);
        let filteredImages = images.filter((image) => {
          return image.public_id !== public_id;
        });
        setImages(filteredImages);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <LoadingOutlined className="m-5 p-5 primary" />
      ) : (
        <div className="row">
          {images &&
            images.map((image) => (
              <Badge
                count="X"
                className="mr-5 mb-3"
                key={image.public_id}
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: "pointer" }}
              >
                <Avatar src={image.url} shape="square" size={80} />
              </Badge>
            ))}
        </div>
      )}
      <div className="row">
        <div className="form-element">
          <h6>Upload Media</h6>

          <label htmlFor="actual-btn">
            Add Media File <UploadOutlined className="icon-pos" />
            <input
              type="file"
              id="actual-btn"
              hidden
              accept="images"
              multiple
              onChange={handleFileUploadAndResize}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
