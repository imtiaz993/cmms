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
    const url = `/work-orders/getByStatus?query=${query}${
      status !== "all" && `&status=${status}`
    }`;
    const { status: s, data } = await authRequest({
      url: url,
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

export const getFilteredWorkOrders = async (values, query, WOStatus) => {
  try {
    const { status, data } = await authRequest({
      url: `/work-orders/getFilteredWorkOrders${
        query ? `?query=${query}` : ""
      }${WOStatus ? (WOStatus !== "all" ? `&status=${WOStatus}` : "") : ""}`,
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
// details page
export const getWorkOrderDetails = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/getWorkOrderDetails/" + id,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const emailWorkOrder = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/email/" + id,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const printWorkOrder = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/print/" + id,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const cancelWorkOrder = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/cancel/" + id,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const saveWorkOrder = async (id, values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/save/" + id,
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

export const startWorkOrder = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/startWorkOrder",
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

export const endWorkOrder = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/endWorkOrder",
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

export const completeWorkOrder = async (id) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/complete/" + id,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addManHours = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/addManHours",
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

export const getFilteredManHours = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/filteredManHours",
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

export const addCostinWO = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/addCostinWO",
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
      url: "/work-orders/addImage",
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
