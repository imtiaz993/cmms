import { authRequest } from "app/services/requestHandler";

export const getCategories = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/category/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const createCategory = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/category/create",
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

export const filterCategories = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/category/filter",
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

export const exportCategories = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/category/export",
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
