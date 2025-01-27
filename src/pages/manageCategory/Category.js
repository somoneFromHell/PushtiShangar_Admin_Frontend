import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Card,
  CardBody,
  Form,
  CardHeader,
  FormFeedback,
  Input,
  Modal,
  Button,
  ModalBody,
  Spinner,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import Loader from "../../Components/Common/Loader";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../Components/Common/DeleteModal";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../helpers/backend_helper";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
  // FilePondPluginFilePoster
);

const CategoryMaster = () => {
  document.title = "Category Master";
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [allTableData, setAllTableData] = useState([]);
  const [recordForSubmit, setrecordForSubmit] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [valuesForUpdate, setValuesForUpdate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [buttnLoading, setButtnLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getCategory();
      setTableData(response);
      setAllTableData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if(tableData.length===0){

      fetchData();
    }
    setFiles([]);
  }, []);

  const toggle = useCallback(() => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [showModal]);

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    let filterData = filterItems(allTableData, inputVal);
    setTableData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const handledeleteProduct = async () => {
    if (valuesForUpdate) {
      await deleteCategory(valuesForUpdate);
      fetchData();
      setDeleteModal(false);
    }
  };

  const categoryValidation = Yup.object().shape({
    name: Yup.string().required("required"),
   
  });

  const categoryForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: (valuesForUpdate && valuesForUpdate.name) || "",
      noOfProducts: (valuesForUpdate && valuesForUpdate.noOfProducts) || "",
      description: (valuesForUpdate && valuesForUpdate.description) || "",
    },
    validationSchema: categoryValidation,
    onSubmit: async (values) => {
      console.log(files[0].file);
      setSubmitted(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("noOfProducts", values.noOfProducts);
      if (files.length !== 0) {
        formData.append("image", files[0].file);
      }
      setButtnLoading(true);
      if (isEdit) {
        await updateCategory(formData, valuesForUpdate._id);
      } else {
        await addCategory(formData);
      }
      fetchData();
      setButtnLoading(false);
      setIsEdit(false);
      setSubmitted(false);
      categoryForm.resetForm();
      toggle();
    },
  });

  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handledeleteProduct()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Container fluid>
      <BreadCrumb grandParent="Setup" parent="Manage Category" child="Category" />
        <Row>
          <Col lg={12}>
            
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1">Category </h5>

                  <Col className="col-lg-auto mx-2">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search"
                        placeholder="Search..."
                        onKeyUp={(e) => searchList(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <div className="flex-shrink-0">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-primary add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          setValuesForUpdate("");
                          setFiles([]);

                          toggle();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Category
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div>
                  <table className="table">
                    <thead className="table-active">
                      <tr>
                        <th>index</th>
                        <th>Category Title</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length ? (
                        tableData.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.name}</td>
                            <td>
                              {" "}
                              {item.isActive ? (
                                <div>
                                  <span className="badge badge-soft-success badge-border">
                                    Active
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span className="badge badge-soft-danger badge-border">
                                    InActive
                                  </span>
                                </div>
                              )}
                            </td>

                            <td>
                            <button
                                className="btn btn-sm btn-soft-info edit-list mx-1"
                                onClick={() => {
                                  setIsEdit(true);
                                  setValuesForUpdate(item);
                                  setShowModal(true);
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>
                              <button
                                className="btn btn-sm btn-soft-danger remove-list"
                                onClick={() => {
                                  setValuesForUpdate(item);
                                  setDeleteModal(true);
                                }}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                             
                            </td>
                          </tr>
                        ))
                      ) : (
                        <Loader error={tableData} />
                      )}
                    </tbody>
                  </table>
                </div>
                <Modal
                  id="showModal"
                  isOpen={showModal}
                  toggle={toggle}
                  centered
                >
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                    {!!isEdit ? "Edit Category" : "Add Category"}
                  </ModalHeader>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      categoryForm.handleSubmit();
                      return false;
                    }}
                  >
                    <ModalBody>
                      <div className="mb-3">
                        <FilePond
                          files={files}
                          onupdatefiles={setFiles}
                          allowMultiple={false}
                          maxFiles={3}
                          name="files"
                          className="filepond filepond-input-multiple"
                          allowFilePoster={true}
                        ></FilePond>
                        <img
                          src={
                            files.length === 0
                              ? `${url}/cagtegory/${valuesForUpdate.image}`
                              : null
                          }
                          alt=""
                          style={{
                            width: "450px",
                            height: "auto",
                            maxHeight: "250px",
                            objectFit: "cover",
                            borderRadius: "3px",
                          }}
                        />

                        {submitted && files.length === 0 ? (
                          <p style={{ color: "red" }}>Please select an image</p>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          category title*
                        </Label>
                        <Input
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter categry title"
                          type="text"
                          onChange={categoryForm.handleChange}
                          onBlur={categoryForm.handleBlur}
                          value={categoryForm.values.name || ""}
                          invalid={
                            categoryForm.touched.name &&
                            categoryForm.errors.name
                              ? true
                              : false
                          }
                        />
                        {categoryForm.touched.name &&
                        categoryForm.errors.name ? (
                          <FormFeedback type="invalid">
                            {categoryForm.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          no of products
                        </Label>
                        <Input
                          name="noOfProducts"
                          id="noOfProducts"
                          className="form-control"
                          placeholder="total products under this category"
                          type="number"
                          onChange={categoryForm.handleChange}
                          onBlur={categoryForm.handleBlur}
                          value={categoryForm.values.noOfProducts || ""}
                          invalid={
                            categoryForm.touched.noOfProducts &&
                            categoryForm.errors.noOfProducts
                              ? true
                              : false
                          }
                        />
                        {categoryForm.touched.noOfProducts &&
                        categoryForm.errors.noOfProducts ? (
                          <FormFeedback type="invalid">
                            {categoryForm.errors.noOfProducts}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="id-field" className="form-label">
                          description
                        </Label>
                        <Input
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="Enter description"
                          type="textarea"
                          onChange={categoryForm.handleChange}
                          onBlur={categoryForm.handleBlur}
                          value={categoryForm.values.description || ""}
                          invalid={
                            categoryForm.touched.description &&
                            categoryForm.errors.description
                              ? true
                              : false
                          }
                        />
                        {categoryForm.touched.description &&
                        categoryForm.errors.description ? (
                          <FormFeedback type="invalid">
                            {categoryForm.errors.description}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </ModalBody>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            setShowModal(false);
                            setValuesForUpdate("");
                          }}
                        >
                          Close
                        </button>

                        {!buttnLoading ? (
                          <React.Fragment>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="addNewTodo"
                            >
                              {!!isEdit ? "Update" : "Add Category"}
                            </button>
                          </React.Fragment>
                        ) : (
                          <Button
                            color="primary"
                            className="btn-load"
                            outline
                            disabled
                          >
                            <span className="d-flex align-items-center">
                              <Spinner size="sm" className="flex-shrink-0">
                                {" "}
                                Loading...{" "}
                              </Spinner>
                              <span className="flex-grow-1 ms-2">
                                Loading...
                              </span>
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Form>
                </Modal>
                <ToastContainer closeButton={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryMaster;
