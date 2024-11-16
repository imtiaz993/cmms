import axios from "axios";
import { authRequest } from "../requestHandler";

export const updateProfile = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/auth/updateAdminProfile",
      method: "POST",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response) {
        throw { status: e.response.status, message: e.response.data?.message };
      }
    }
    throw e;
  }
};

export const changePassword = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: `/auth/changePassword`,
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
