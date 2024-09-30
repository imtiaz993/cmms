import axios from "axios";
import { publicRequest } from "../requestHandler";

export const login = async (values) => {
  try {
    const { status, data } = await publicRequest({
      url: "/user/login",
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

export const forgotPassword = async (values) => {
  try {
    const { status, data } = await publicRequest({
      url: `/user/forgot-password`,
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

export const resetPassword = async (values) => {
  try {
    const { status, data } = await publicRequest({
      url: `/user/reset-password`,
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

export const changePassword = async (role, values) => {
  try {
    const { status, data } = await authRequest({
      url: `/${role}/change-password`,
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
