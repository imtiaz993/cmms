import { authRequest } from "../requestHandler";

export const getWorkOrders = async (query) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/get?query=" + query,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const exportWorkOrders = async (query) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/export?query=" + query,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getWorkOrdersByStatus = async (status, query) => {
  try {
    const { status: s, data } = await authRequest({
      url: "/work-orders/getByStatus?status=" + status + "&query=" + query,
    });
    return { status: s, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getWorkOrdersByTimeRange = async (timeRange, query) => {
  try {
    const { status, data } = await authRequest({
      url:
        "/work-orders/getByTimeRange?timeRange=" +
        timeRange +
        "&query=" +
        query,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
