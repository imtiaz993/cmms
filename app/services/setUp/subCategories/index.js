import { authRequest } from "app/services/requestHandler";

export const getSubCategories = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/subCategory/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const createSubCategory = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/subCategory/create",
      method: "POST",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const filterSubCategories = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/subCategory/filter",
      method: "POST",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const exportSubCategories = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/subCategory/export",
      method: "POST",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
