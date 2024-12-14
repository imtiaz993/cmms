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

export const getFilteredWorkOrders = async (values, query) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/getFilteredWorkOrders?query=" + query,
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

export const getEarlyMaintenanceData = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/getEarlyMaintenanceData",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addPlannedWorkOrder = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/addPlannedWorkOrder",
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

export const addUnplannedWorkOrder = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/addUnplannedWorkOrder",
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
