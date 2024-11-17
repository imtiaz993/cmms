import { publicRequest } from "../requestHandler";

export const login = async (values) => {
  try {
    const { status, data } = await publicRequest({
      url: "/auth/login",
      method: "POST",
      data: values,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  };
}

export const forgotPassword = async (values) => {
  try {
    const { status, data } = await publicRequest({
      url: `/auth/forgetPassword`,
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
      url: `/auth/resetPassword`,
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
