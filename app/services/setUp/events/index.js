import { authRequest } from "app/services/requestHandler";

export const getEvents = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/event/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const createEvent = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/event/create",
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

export const filterEvents = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/event/filter",
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

export const exportEvents = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/event/export",
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
