import { authRequest } from "app/services/requestHandler";

export const getManagers = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/manager/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const createManager = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/manager/create",
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
export const deleteManager = async (managerId) => {
  try {
    const { status, data } = await authRequest({
      url: `/manager/delete?id=${managerId}`,
      method: "DELETE",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const updateManager = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/manager/update",
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
