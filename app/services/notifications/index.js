import { authRequest } from "../requestHandler";

export const getNotifications = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/notification/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};