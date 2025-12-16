import React, { useEffect, useState } from "react";
import { useParams, useDispatch, useSelector } from "react-redux";
import { fetchCreams, updateCream } from "../Features/creamSlice";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Spinner
} from "reactstrap";

const UpdateCream = () => {
  const { id } = useParams(); // الحصول على معرف الكريم من الـ URL
  const dispatch = useDispatch();
  const cream = useSelector((state) => state.cream.creams.find(c => c._id === id));
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    imagePreview: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (cream) {
      setFormData({
        name: cream.name,
        price: cream.price,
        description: cream.description,
        image: null,
        imagePreview: cream.image || ""
      });
    }
  }, [cream]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      await dispatch(updateCream({ id, data }));
      setSuccess("Cream updated successfully.");
    } catch (err) {
      setError("Failed to update cream.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Cream</h2>

      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}

      {cream ? (
        <Form onSubmit={handleSubmit} className="mb-5">
          <FormGroup>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Image</Label>
            <Input type="file" onChange={handleImage} />
          </FormGroup>

          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Preview"
              width="150"
              className="mb-3"
              style={{ borderRadius: "8px" }}
            />
          )}

          <Button color="primary" disabled={loading}>
            Update Cream
          </Button>
        </Form>
      ) : (
        <p>Cream not found.</p>
      )}
    </Container>
  );
};

export default UpdateCream;