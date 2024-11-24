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
