import axios from "axios";
import { authRequest } from "../requestHandler";

export const updateProfile = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/auth/updateAdminProfile",
      method: "PATCH",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  };
}

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
