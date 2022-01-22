import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import s from "./styles/Productform.module.css";
import ReactMarkdown from "react-markdown";
import { Button, Input, Modal, Option, Select, TextArea } from "artemis-ui";
import ImageUpload from "../ImageUpload/ImageUpload";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { productRef } from "../../firebase";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import kebabCase from "lodash.kebabcase";
import {
  categoryOptions,
  sizeOptions,
  colorOptions,
} from "../../filterOptions";
import Loader from "../Loader";

const AddProduct = ({ initialFormData = null }) => {
  const [isMdPreview, setIsMdPreview] = useState(false);
  const [isUploaderVisible, setIsUploaderVisible] = useState(false);
  const [addURLvisible, setAddURLVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(() =>
    initialFormData
      ? initialFormData
      : {
          name: "",
          price: 0,
          stock: 0,
          rating: 0,
          brand: "nike",
          sizes: [],
          colors: [],
          category: [],
          gender: "",
          description: "",
          details: "",
          thumbnailURL: "",
          images: [],
          createdAt: serverTimestamp(),
        }
  );

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      stock: 0,
      rating: 0,
      brand: "nike",
      sizes: [],
      colors: [],
      category: [],
      gender: "",
      description: "",
      details: "",
      thumbnailURL: "",
      images: [],
      createdAt: serverTimestamp(),
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormData(prevState => ({
      ...prevState,
      price: Number(prevState.price),
      stock: Number(prevState.stock),
    }));
    console.log("GOING", formData);
    setIsLoading(true);
    addDoc(productRef, formData)
      .then(() => {
        toast.success("Product info successfully uploaded!");
        resetForm();
      })
      .catch(err => {
        console.log(err);
        toast.error("Unable to upload product info!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = e => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const setColor = clrs => {
    setFormData(prevData => ({
      ...prevData,
      colors: [...clrs],
    }));
  };
  const setSize = sizes => {
    setFormData(prevData => ({
      ...prevData,
      sizes: [...sizes],
    }));
  };
  const setCategory = categories => {
    setFormData(prevData => ({
      ...prevData,
      category: [...categories],
    }));
  };

  const setImageURL = url => {
    setFormData(prevData => {
      const imgs = prevData.images;
      return {
        ...prevData,
        images: [...imgs, url],
      };
    });
    toast.success("Image added successfully!");
  };

  const removeImage = url => {
    const images = formData.images.filter(img => img !== url);
    setFormData(prevData => ({
      ...prevData,
      images: [...images],
    }));
  };

  return (
    <div className={s.addProduct}>
      <ImageUploadModal
        visible={isUploaderVisible}
        onClose={() => setIsUploaderVisible(false)}
        path={`products/${kebabCase(formData.name)}`}
      />
      <MkdModal
        data={formData.details}
        visible={isMdPreview}
        onClose={() => setIsMdPreview(false)}
      />
      <AddURL
        visible={addURLvisible}
        onClose={() => setAddURLVisible(false)}
        onSubmit={setImageURL}
      />
      <h2>Submit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* ======== Product Name ======== */}
        <div className={s.formfield}>
          <Input
            shape="rounded"
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Product Name"
            autoComplete="off"
            placeholder="Enter product name"
          />
        </div>
        {/* ======== Product Price ======== */}

        <div className={s.formfield}>
          <Input
            shape="rounded"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            label="Price"
            autoComplete="off"
          />
        </div>
        {/* ======== Stock ======== */}

        <div className={s.formfield}>
          <Input
            shape="rounded"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            autoComplete="off"
            label="Stock"
          />
        </div>
        {/* ======== Brand ======== */}
        <div className={s.formfield}>
          <label htmlFor="">Brand</label>

          <Select
            name="brand"
            onChange={handleChange}
            defaultValue={formData.brand}
          >
            <Option value="select-brand" disabled>
              Select a brand
            </Option>
            <Option value="nike">Nike</Option>
            <Option value="puma">Puma</Option>
            <Option value="reebok">Reebok</Option>
            <Option value="adidas">Adidas</Option>
          </Select>
        </div>

        {/* ======== Size ======== */}
        <div className={s.formfield}>
          <label htmlFor="sizes">Size</label>
          <MultiSelect
            options={sizeOptions}
            value={formData.sizes}
            onChange={setSize}
            labelledBy="sizes"
          />
        </div>
        {/* ======== COLORS ======== */}

        <div className={s.formfield}>
          <label htmlFor="colors">Colors</label>
          <MultiSelect
            options={colorOptions}
            value={formData.colors}
            onChange={setColor}
            labelledBy="colors"
          />
        </div>
        {/* ======== category ======== */}

        <div className={s.formfield}>
          <label htmlFor="category">Category</label>
          <MultiSelect
            options={categoryOptions}
            value={formData.category}
            onChange={setCategory}
            labelledBy="Categories"
          />
        </div>

        {/* ======== Gender  ======== */}
        <div className={s.formfield}>
          <label htmlFor="gender">Gender</label>

          <Select
            name="gender"
            onChange={handleChange}
            defaultValue="select-gender"
          >
            <Option value="select-gender" disabled>
              Select a gender
            </Option>
            <Option value="m">Male</Option>
            <Option value="f">Female</Option>
            <Option value="u">Unisex</Option>
          </Select>
        </div>

        {/* ======== Description ======== */}
        <div className={s.formfield}>
          <TextArea
            shape="rounded"
            name="description"
            value={formData.description}
            onChange={handleChange}
            label="Short Description"
            placeholder="Enter a short description"
          />
        </div>

        {/* DETAILS or SPECS */}
        <div className={s.formfield}>
          <TextArea
            shape="rounded"
            name="details"
            value={formData.details}
            onChange={handleChange}
            label="Product Details (use markdown format)"
            height="300px"
            placeholder="Enter product details in markdown format"
          />

          <Button
            onClick={() => setIsMdPreview(true)}
            shape="rounded"
            type="button"
            size="sm"
            variant="primary-light"
            style={{
              marginTop: "1rem",
            }}
          >
            Show Preview
          </Button>
        </div>

        <div className={s.formfield}>
          <Input
            shape="rounded"
            name="thumbnailURL"
            type="text"
            value={formData.thumbnailURL}
            onChange={handleChange}
            autoComplete="off"
            label="Thumbnail Image URL"
            placeholder="Enter thumbnail url"
          />
        </div>

        <div className={s.formfield}>
          <div className={s.temp}>
            <h2>Images</h2>
            <Button
              shape="rounded"
              size="sm"
              variant="primary-light"
              type="button"
              onClick={() => setAddURLVisible(true)}
            >
              Add URL
            </Button>

            <Button
              shape="rounded"
              size="sm"
              variant="primary-light"
              type="button"
              onClick={() => setIsUploaderVisible(true)}
            >
              Open Uploader
            </Button>
          </div>
          <div className={s.imagecollection}>
            {formData.images.map((url, index) => (
              <div className={s.imgWrapper} key={index}>
                <div className={s.removeImage}>
                  <span onClick={() => removeImage(url)}>
                    <AiOutlineDelete />
                  </span>
                </div>
                <img src={url} alt="product" />
              </div>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          shape="rounded"
          disabled={isLoading}
        >
          {isLoading ? <Loader show /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;

const AddURL = ({ visible, onClose, onSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(url);
    setUrl("");
  };

  return (
    <Modal
      title="Upload File"
      visible={visible}
      onClose={onClose}
      shape="rounded"
      placement="center"
      width="360px"
    >
      <form onSubmit={handleSubmit}>
        <div className={s.formfield}>
          <Input
            shape="rounded"
            name="name"
            value={url}
            onChange={e => setUrl(e.target.value)}
            label="Image Url"
            autoComplete="off"
            placeholder="Enter Image Url"
          />
        </div>
        <div className={s.formfield}>
          <Button
            type="submit"
            variant="primary"
            shape="rounded"
            size="sm"
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const ImageUploadModal = ({ path, visible, onClose }) => {
  return (
    <Modal
      title="Upload File"
      visible={visible}
      onClose={onClose}
      shape="rounded"
      placement="center"
      width="360px"
    >
      <ImageUpload path={path} />
    </Modal>
  );
};

const MkdModal = ({ data, visible, onClose }) => {
  return (
    <Modal
      title="Markdown Preview"
      visible={visible}
      onClose={onClose}
      shape="rounded"
      placement="center"
      width="360px"
    >
      <ReactMarkdown className="react-markdown">{data}</ReactMarkdown>
    </Modal>
  );
};
