import { authRequest } from "app/services/requestHandler";

export const getCompany = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/company/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const deleteCompany = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/company/delete?id=" + id,
      method: "DELETE",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const updateCompany = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/company/update",
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
