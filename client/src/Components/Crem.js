import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreams } from "../Features/creamSlice";
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

const Crem = () => {
  const dispatch = useDispatch();

  const creams = useSelector((state) => state.cream.creams);
  const loading = useSelector((state) => state.cream.loading);
  const error = useSelector((state) => state.cream.error);

 
  const [addedCount, setAddedCount] = useState({});

  useEffect(() => {
    dispatch(fetchCreams());
  }, [dispatch]);

 const handleAddToCart = (cream) => {
  dispatch(addToCartDB(cream));

  setAddedCount((prev) => ({
    ...prev,
    [cream._id]: (prev[cream._id] || 0) + 1,
  }));
};

  return (
    <div className="per-container" style={{ backgroundColor: "#a8a8a8ff" }}>
      <Header />

      <div className="category-content">
        {loading && <Spinner color="primary" />}
        {error && <Alert color="danger">{error}</Alert>}

        <Row className="g-2">
          {creams.map((cream) => (
            <Col sm="6" md="4" lg="3" key={cream._id} className="mb-4">
              <Card className="perfume-card">
                {cream.imageUrl ? (
                  <CardImg
                    top
                    src={cream.imageUrl}
                    alt={cream.name}
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
                  <CardTitle tag="h5">{cream.name}</CardTitle>

                  <CardText>
                    <strong>Price:</strong> ${cream.price}
                    <br />
                    <strong>Description:</strong> {cream.description}
                  </CardText>

                  <Button
                    color="primary"
                    onClick={() => handleAddToCart(cream)}
                  >
                   Add to Cart{" "}
                    {addedCount[cream._id]
                      ? `(${addedCount[cream._id]})`
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

export default Crem;
