import { authRequest } from "../requestHandler";
export const sendToken = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/auth/addFCM",
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
