import { authRequest } from "../requestHandler";

export const getDashboardStats = async () => {
  try {
    const { status, data } = await authRequest({ url: "/dashboard/get" });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getDashboardSchedule = async () => {
  try {
    const { status, data } = await authRequest({ url: "/dashboard/schedule" });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getDailyWorkOrders = async (date) => {
  try {
    const { status, data } = await authRequest({
      url: `/work-orders/getDailyWorkOrders?date=${date}`,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const printDailyWorkOrders = async (ids) => {
  try {
    const { status, data } = await authRequest({
      url: `/work-orders/printDailyWorkOrders`,
      method: "POST",
      data: ids,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const rescheduleWorkOrders = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/work-orders/reschedule",
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
