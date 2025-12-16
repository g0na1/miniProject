import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPerfumes, addPerfume, updatePerfume, deletePerfume } from "../Features/perfumeSlice";
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
import { useNavigate } from "react-router-dom";

const ManagePerfumes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const perfumes = useSelector((state) => state.perfume.perfumes);
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
    const loadPerf = async () => {
      setLoading(true);
      try {
        await dispatch(fetchPerfumes());
      } catch (err) {
        setError("Failed to load perfumes.");
      } finally {
        setLoading(false);
      }
    };
    loadPerf();
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
        // If editing, update the existing perfume
        await dispatch(updatePerfume({ id: editingId, data }));
        setSuccess("Perfume updated successfully.");
        setEditingId(null);
      } else {
        // Otherwise, add a new perfume
        await dispatch(addPerfume(data));
        setSuccess("Perfume added successfully.");
      }
      resetForm();
    } catch (err) {
      setError("Failed to save perfume.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (perfume) => {
    setEditingId(perfume._id);
    setFormData({
      name: perfume.name,
      price: perfume.price,
      description: perfume.description,
      imageUrl: perfume.imageUrl,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this perfume?")) {
      setLoading(true);
      try {
        await dispatch(deletePerfume(id));
        setSuccess("Perfume deleted successfully.");
      } catch (err) {
        setError("Failed to delete perfume.");
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
      <h2 className="text-center mb-4">Manage Perfumes</h2>

      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}

      {/* ====== FORM ====== */}
      <Card className="mb-5 shadow-sm">
        <CardBody>
          <CardTitle tag="h5">{editingId ? "Update Perfume" : "Add New Perfume"}</CardTitle>
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
              <Label>Image URL</Label>
              <Input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="Paste the image URL here" />
            </FormGroup>

            <Button color="primary" disabled={loading}>
              {editingId ? "Update Perfume" : "Add Perfume"}
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* ====== TABLE ====== */}
      <h3 className="mb-3">Existing Perfumes</h3>
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
          {perfumes.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No Perfumes added yet.</td>
            </tr>
          ) : (
            perfumes.map((perf, index) => (
              <tr key={perf._id}>
                <td>{index + 1}</td>
                <td>{perf.imageUrl && <img src={perf.imageUrl} width="80" alt={perf.name} style={{ borderRadius: "6px" }} />}</td>
                <td>{perf.name}</td>
                <td>{perf.price}</td>
                <td>{perf.description}</td>
                <td>
                  <Button color="warning" className="me-2" onClick={() => handleEdit(perf)}>
                    Edit
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(perf._id)}>
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

export default ManagePerfumes;