import { authRequest } from "app/services/requestHandler";

export const getSites = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/site/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const createSite = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/site/create",
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

export const filterSites = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/site/filter",
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

export const exportSites = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/site/export",
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
