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
