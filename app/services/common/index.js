import { authRequest } from "../requestHandler";

export const getAdminsManagers = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/super/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
