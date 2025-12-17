import React, { useState } from "react";
import { Button, Alert, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (paymentMethod === "card") {
      if (!formData.name) errors.name = "Name is required.";
      if (!formData.cardNumber || formData.cardNumber.length !== 16)
        errors.cardNumber = "Card number must be 16 digits.";
      if (!formData.expiryDate) errors.expiryDate = "Expiry date is required.";
      if (!formData.cvv || formData.cvv.length !== 3)
        errors.cvv = "CVV must be 3 digits.";
    }
    return errors;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setPurchaseCompleted(true);
  };

  return (
    <Container>
      <h2 className="mt-4">Payment Page</h2>
      <p>Please select your payment method and enter the details below:</p>

      <Form onSubmit={handlePayment}>
        <FormGroup>
          <Label for="paymentMethod">Payment Method</Label>
          <div>
            <Label check>
              <Input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Cash
            </Label>
            <Label check className="ml-3">
              <Input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit Card
            </Label>
          </div>
        </FormGroup>

        {paymentMethod === "card" && (
          <>
            <FormGroup>
              <Label for="name">Name on Card</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name on card"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {validationErrors.name && (
                <p className="text-danger">{validationErrors.name}</p>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="cardNumber">Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="Enter card number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                maxLength="16"
              />
              {validationErrors.cardNumber && (
                <p className="text-danger">{validationErrors.cardNumber}</p>
              )}
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="expiryDate">Expiry Date (MM/YY)</Label>
                  <Input
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.expiryDate && (
                    <p className="text-danger">{validationErrors.expiryDate}</p>
                  )}
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="cvv">CVV</Label>
                  <Input
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    maxLength="3"
                  />
                  {validationErrors.cvv && (
                    <p className="text-danger">{validationErrors.cvv}</p>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </>
        )}

        <Button color="primary" type="submit">
          Complete Purchase
        </Button>
      </Form>

      {purchaseCompleted && (
        <Alert color="success" className="mt-3">
          Purchase completed successfully!
        </Alert>
      )}
    </Container>
  );
};

export default Payment;
