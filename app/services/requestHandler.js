import axios from "axios";
import { getToken } from "@/utils/index";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const authRequest = async ({ url, method = "GET", data, headers }) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...headers,
      },
      url,
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject({
          ...err.response,
        });
      });
  });
};

export const publicRequest = async ({ url, method = "GET", data, headers }) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      headers: {
        ...headers,
      },
      url,
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject({
          ...err.response,
        });
      });
  });
};
