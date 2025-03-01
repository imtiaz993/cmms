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

export const updateInventoryApi = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/inventory/update",
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

export const getInventoryDetails = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: `/inventory/view/?inventory=${id}`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const exportInventory = async () => {
  try {
    const { status, data } = await authRequest({
      url: `/inventory/export`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const changeInventoryToAsset = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/inventory/changeToAsset",
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

export const updateStatus = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/inventory/updateStatus",
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

export const addImage = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/inventory/addImage",
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
