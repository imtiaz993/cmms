import { authRequest } from "../requestHandler";

export const getFields = async (module) => {
  try {
    const { status, data } = await authRequest({
      url: `/fields/get?module=${module}`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addField = async (module, body) => {
  try {
    const { status, data } = await authRequest({
      url: `/fields/add?module=${module}`,
      method: "POST",
      data: body,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const deleteField = async (module, id) => {
  try {
    const { status, data } = await authRequest({
      url: `/fields/delete?module=${module}&id=${id}`,
      method: "DELETE",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
