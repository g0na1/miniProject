import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncense } from "../Features/incenseSlice";
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

const Ins = () => {
  const dispatch = useDispatch();

  const incense = useSelector((state) => state.incense.incense);
  const loading = useSelector((state) => state.incense.loading);
  const error = useSelector((state) => state.incense.error);

  const [addedCount, setAddedCount] = useState({});

  useEffect(() => {
    dispatch(fetchIncense());
  }, [dispatch]);

 const handleAddToCart = (item) => {
  dispatch(addToCartDB(item));

  setAddedCount((prev) => ({
    ...prev,
    [item._id]: (prev[item._id] || 0) + 1,
  }));
};

  return (
    <div className="per-container" style={{ backgroundColor: "#a8a8a8ff" }}>
      <Header />

      <div className="category-content">
        {loading && <Spinner color="primary" />}
        {error && <Alert color="danger">{error}</Alert>}

        <Row className="g-2">
          {incense.map((item) => (
            <Col sm="6" md="4" lg="3" key={item._id} className="mb-4">
              <Card className="perfume-card">
                {item.imageUrl ? (
                  <CardImg
                    top
                    src={item.imageUrl}
                    alt={item.name}
                    className="card-image"
                  />
                ) : (
                  <CardImg
                    top
                    src="/path/to/fallbackImage.png"
                    alt="Fallback"
                    className="card-image"
                  />
                )}

                <CardBody>
                  <CardTitle tag="h5">{item.name}</CardTitle>

                  <CardText>
                    <strong>Price:</strong> ${item.price}
                    <br />
                    <strong>Description:</strong> {item.description}
                  </CardText>

                  <Button
                    color="primary"
                    onClick={() => handleAddToCart(item)}
                  >
                   Add to Cart{" "}
                    {addedCount[item._id]
                      ? `(${addedCount[item._id]})`
                      : ""}
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Ins;
