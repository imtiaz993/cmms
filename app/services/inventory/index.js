import { authRequest } from "../requestHandler";

export const getInventory = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/inventory/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addInventory = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/inventory/add",
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

export const getFilteredInventory = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/inventory/getFilteredInventory",
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

export const exportInventory = async (hierarchy) => {
  try {
    const { status, data } = await authRequest({
      url: `/inventory/export?hierarchy=${hierarchy}`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
