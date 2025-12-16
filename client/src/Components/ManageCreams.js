import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreams, addCream, updateCream, deleteCream } from "../Features/creamSlice";
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

const ManageCreams = () => {
  const dispatch = useDispatch();
  const creams = useSelector((state) => state.cream.creams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null); // New state for editing

  useEffect(() => {
    const loadCreams = async () => {
      setLoading(true);
      try {
        await dispatch(fetchCreams());
      } catch (err) {
        setError("Failed to load creams.");
      } finally {
        setLoading(false);
      }
    };
    loadCreams();
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

    const data = { ...formData };

    try {
      if (editingId) {
        // If editing, update the existing cream
        await dispatch(updateCream({ id: editingId, data }));
        setSuccess("Cream updated successfully.");
        setEditingId(null);
      } else {
        // Otherwise, add a new cream
        await dispatch(addCream(data));
        setSuccess("Cream added successfully.");
      }
      resetForm();
    } catch (err) {
      setError("Failed to save cream.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cream) => {
    setEditingId(cream._id);
    setFormData({
      name: cream.name,
      price: cream.price,
      description: cream.description,
      imageUrl: cream.imageUrl,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this cream?")) {
      setLoading(true);
      try {
        await dispatch(deleteCream(id));
        setSuccess("Cream deleted successfully.");
      } catch (err) {
        setError("Failed to delete cream.");
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
      imageUrl: "",
    });
    setEditingId(null); // Reset editingId
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Manage Creams</h2>

      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}

      <Card className="mb-5 shadow-sm">
        <CardBody>
          <CardTitle tag="h5">{editingId ? "Update Cream" : "Add New Cream"}</CardTitle>
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
              <Input
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Image URL</Label>
              <Input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                placeholder="Paste the image URL here"
              />
            </FormGroup>

            <Button color="primary" disabled={loading}>
              {editingId ? "Update Cream" : "Add Cream"}
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* ====== TABLE ====== */}
      <h3 className="mb-3">Existing Creams</h3>
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
          {creams.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No creams added yet.</td>
            </tr>
          ) : (
            creams.map((cream, index) => (
              <tr key={cream._id}>
                <td>{index + 1}</td>
                <td>
                  {cream.imageUrl && (
                    <img
                      src={cream.imageUrl}
                      width="80"
                      alt=""
                      style={{ borderRadius: "6px" }}
                    />
                  )}
                </td>
                <td>{cream.name}</td>
                <td>{cream.price}</td>
                <td>{cream.description}</td>
                <td>
                  <Button color="warning" className="me-2" onClick={() => handleEdit(cream)}>
                    Edit
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(cream._id)}>
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

export default ManageCreams;