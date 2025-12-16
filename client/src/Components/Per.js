import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerfumes } from "../Features/perfumeSlice";
import { addToCartDB } from "../Features/CartSlice";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
} from "reactstrap";
import Header from "./Header";
import "./Per.css"; 

const Per = () => {
  const dispatch = useDispatch();
  const perfumes = useSelector((state) => state.perfume.perfumes);
  const loading = useSelector((state) => state.perfume.loading);
  const error = useSelector((state) => state.perfume.error);
  
  const [addedCount, setAddedCount] = useState({}); 

  useEffect(() => {
    dispatch(fetchPerfumes());
  }, [dispatch]);

  const handleAddToCart = (perfume) => {
  dispatch(addToCartDB(perfume));

  setAddedCount(prev => ({
    ...prev,
    [perfume._id]: (prev[perfume._id] || 0) + 1,
  }));
};

  return (
    <div className="per-container" style={{ backgroundColor: '#a8a8a8ff' }}>
      <Header />
      <div className="category-content">
        {loading && <Spinner color="primary" />}
        {error && <Alert color="danger">{error}</Alert>}
        <Row className="g-2"> 
          {perfumes.map((perfume) => {
            return (
              <Col sm="6" md="4" lg="3" key={perfume._id} className="mb-4">
                <Card className="perfume-card">
                  {perfume.imageUrl ? (
                    <CardImg top src={perfume.imageUrl} alt={perfume.name} className="card-image" />
                  ) : (
                    <CardImg top src="/path/to/fallbackImage.png" alt="Fallback" className="card-image" />
                  )}
                  <CardBody>
                    <CardTitle tag="h5">{perfume.name}</CardTitle>
                    <CardText>
                      <strong>Price:</strong> ${perfume.price}<br />
                      <strong>Description:</strong> {perfume.description}
                    </CardText>
                    <Button color="primary" onClick={() => handleAddToCart(perfume)}>
                      Add to Cart {addedCount[perfume._id] ? `(${addedCount[perfume._id]})` : ''}
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  );
};

export default Per;