import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIncense, addIncense, updateIncense, deleteIncense } from "../Features/incenseSlice";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Alert,
  Spinner,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

const ManageIncense = () => {
  const dispatch = useDispatch();
  const incense = useSelector((state) => state.incense.incense);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "", // Changed from image to imageUrl
  });
  const [editingId, setEditingId] = useState(null);

  // Load incense from server
  useEffect(() => {
    setLoading(true);
    const loadIncense = async () => {
      try {
        await dispatch(fetchIncense());
      } catch (err) {
        setError("Failed to load incense.");
      } finally {
        setLoading(false);
      }
    };
    loadIncense();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = { ...formData }; // Keep as object format for URL

    try {
      if (editingId) {
        await dispatch(updateIncense({ id: editingId, data }));
        setSuccess("Incense updated successfully.");
        setEditingId(null);
      } else {
        await dispatch(addIncense(data));
        setSuccess("Incense added successfully.");
      }
      resetForm();
    } catch (err) {
      setError("Failed to save incense.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl, // Changed from image to imageUrl
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this incense?")) {
      setLoading(true);
      try {
        await dispatch(deleteIncense(id));
        setSuccess("Incense deleted successfully.");
      } catch (err) {
        setError("Failed to delete incense.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      imageUrl: "", // Reset imageUrl
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Manage Incense</h2>

      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}

      <Card className="mb-5 shadow-sm">
        <CardBody>
          <CardTitle tag="h5">{editingId ? "Update Incense" : "Add New Incense"}</CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <Label>Price</Label>
              <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input type="textarea" name="description" value={formData.description} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <Label>Image URL</Label> {/* Changed label */}
              <Input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="Enter the image URL" />
            </FormGroup>

            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="preview" width="150" className="mb-3" />
            )}

            <Button color="primary" disabled={loading}>
              {editingId ? "Update Incense" : "Add Incense"}
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* ====== TABLE ====== */}
      <h3 className="mb-3">Existing Incenses</h3>
      <Table bordered striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incense.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No incense added yet.</td>
            </tr>
          ) : (
            incense.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.imageUrl && <img src={item.imageUrl} width="80" alt="incense" />}</td> {/* Changed to imageUrl */}
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <Button color="warning" className="me-2" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageIncense;