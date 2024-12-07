import { authRequest } from "../requestHandler";

export const getAssets = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/asset/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addAsset = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/asset/add",
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

export const updateAsset = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/asset/update",
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

export const deleteAsset = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/asset/delete",
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

export const getFilteredAssets = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/asset/getFilteredAssets",
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

export const exportAssets = async (hierarchy) => {
  try {
    const { status, data } = await authRequest({
      url: `/asset/export?hierarchy=${hierarchy}`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getAssetDetails = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: `/asset/getAssetDetails?slug=${id}`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addCost = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/asset/addCost",
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
