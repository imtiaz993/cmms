import axios from "axios";
import { authRequest } from "../requestHandler";

export const updateProfile = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/user/update-profile",
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

export const updatePassword = async (values) => {
    try {
      const { status, data } = await authRequest({
        url: "/user/update-password",
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