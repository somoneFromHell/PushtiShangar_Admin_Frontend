import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};



// Register Method
export const postFakeRegister = data => api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = data => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = data => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) => api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data)
    .catch(err => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

//category
export const addCategory = (todo) => api.post("http://localhost:5000", todo);
export const deleteCategory = (todo) => api.delete(url.DELETE_TODO, { headers: { todo } });
export const getCategory = async() => await api.create("http://localhost:5000/category/getcategories");
export const updateCategory = (todo) => api.put(url.UPDATE_TODO, todo);
export const getProducts = async() => await api.create("http://localhost:5000/product/getallproducts");
export const deleteProduct = async() => await api.create("http://localhost:5000/product/deleteproduct");


// sub category
export const getSubCategory = async() => await api.create("http://localhost:5000/subcategory/getsubcategories");

//sub sub category

export const getSubSubCategory = async() => await api.create("http://localhost:5000/subsubcategory/getsubsubcategories");


export const addProduct = async (data) => await api.create("http://localhost:5000/product/addproduct", data);