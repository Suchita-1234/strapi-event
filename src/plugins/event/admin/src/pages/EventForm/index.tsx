import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useFormik } from "formik";
import { Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pluginId from "../../pluginId";

function EventForm() {
  const navigate = useNavigate();
  const handleFormSubmit = async (values : any) => {
    let headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        "https://localhost:1337/events",
        values,
        { headers }
      );
      if (response.status === 200) {
        navigate(`/plugins/${pluginId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    venue: Yup.string().required("Venue is required"),
    ticketPrice: Yup.number()
      .typeError("Ticket Price must be a number")
      .positive("Ticket Price must be a positive number")
      .required("Ticket Price is required"),
    capacity: Yup.number()
      .typeError("Capacity must be a number")
      .positive("Capacity must be a positive number")
      .required("Capacity is required"),
  });

  const formik : any = useFormik({
    initialValues: {
      name: "",
      description: "",
      venue: "",
      ticketPrice: 0,
      capacity: 0,
      recurrence: "one-time",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <div
      style={{ width: "50%", padding: 30 }}
      className="d-flex justify-content-center flex-column m-auto"
    >
      <Container>
        <h4>Strapi event form</h4>

        <Form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            {formik.touched.name && formik.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              style={{ height: "100px" }}
              as="textarea"
              type="email"
              placeholder="Enter Description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              isInvalid={
                formik.touched.description && formik.errors.description
              }
            />
            {formik.touched.description && formik.errors.description && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Venue:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Venue"
              name="venue"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.venue}
              isInvalid={formik.touched.venue && formik.errors.venue}
            />
            {formik.touched.venue && formik.errors.venue && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.venue}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" size="sm" accept="image/*" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ticket Price:</Form.Label>
            <Form.Control
              type="number"
              name="ticketPrice"
              placeholder="Enter your Ticket Price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ticketPrice}
              isInvalid={
                formik.touched.ticketPrice && formik.errors.ticketPrice
              }
            />
            {formik.touched.ticketPrice && formik.errors.ticketPrice && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.ticketPrice}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Capacity:</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              placeholder="Enter No. of attendees"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.capacity}
              isInvalid={formik.touched.capacity && formik.errors.capacity}
            />
            {formik.touched.capacity && formik.errors.capacity && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.capacity}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            name="recurrence"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recurrence}
            isInvalid={formik.touched.recurrence && formik.errors.recurrence}
          >
            <option disabled>Recurrence</option>
            <option value="one-time">one-time</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="other">other</option>
          </Form.Select>
          {formik.touched.recurrence && formik.errors.recurrence && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.recurrence}
            </Form.Control.Feedback>
          )}
          <Button  type="submit">
            Submit form
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EventForm;
