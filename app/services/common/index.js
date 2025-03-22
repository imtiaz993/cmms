import { authRequest } from "../requestHandler";

export const getAdminsManagers = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/super/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getVendors = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/vendor/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addVendor = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/vendor/add",
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

export const deleteVendor = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/vendor/delete/" + id,
      method: "Delete",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const updateVendor = async (values, id) => {
  try {
    const { status, data } = await authRequest({
      url: "/vendor/update/" + id,
      method: "PUT",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getVendorDetails = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/vendor/details/" + id,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
