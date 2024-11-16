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
      url: '/asset/add',
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