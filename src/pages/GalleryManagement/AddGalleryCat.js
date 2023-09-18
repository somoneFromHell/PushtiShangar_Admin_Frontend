import React, { useContext, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import UiContent from "../../Components/Common/UiContent";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, Col, Container, Form, Input, Row } from "reactstrap";

const AddGalleryCat = () => {
  const { createGalleryCat } = useContext(SignContext);
  const [GalleryData, setGalleryData] = useState({
    gallaryCategoryTitle: "",
    description: "",
    imagePath: "",
    active: true,
  });
  const [ImagePath, setImagePath] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setGalleryData({
      ...GalleryData,
      [name]: newValue,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImagePath(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createGalleryCat(GalleryData , ImagePath);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      console.log("Content added successfully");
      setGalleryData({
        gallaryCategoryTitle: "",
        description: "",
        imagePath: "",
        active: true,
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  document.title = "Add Gallery-Category | Gallery";

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Gallery-Category" pageTitle="Gallery" />
          <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-orders-input"
                            >
                              GalleryCategory Title
                            </label>
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                className="form-control"
                                id="product-orders-input"
                                placeholder="Enter Title"
                                name="gallaryCategoryTitle"
                                aria-label="orders"
                                aria-describedby="product-orders-addon"
                                value={GalleryData.gallaryCategoryTitle}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-orders-input"
                            >
                              Description
                            </label>
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                className="form-control"
                                id="product-orders-input"
                                placeholder="Enter Description"
                                name="description"
                                aria-label="orders"
                                aria-describedby="product-orders-addon"
                                value={GalleryData.description}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-orders-input"
                            >
                              GalleryCategory Title
                            </label>
                            <div className="input-group mb-3">
                              <Input
                                type="file"
                                className="form-control"
                                id="profile-photo"
                                accept=".jpg, .jpeg, .png" // Add accepted image formats
                                onChange={handlePhotoChange} // Call a function to handle the file upload
                              />
                            </div>
                          </div>
                        </Col>
                        <Col sm={6}>
                        <div className="mt-3">
                            <Input
                              type="checkbox"
                              id="isActive"
                              label="Is Active"
                              name="active"
                              checked={GalleryData.active}
                              onChange={handleChange}
                            />
                            <label className="me-2">Is Active</label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
                <div className="text-end mb-3">
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    //   onClick={togglesuccessmodal}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddGalleryCat;