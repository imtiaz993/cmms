import { authRequest } from "../requestHandler";

export const getDocuments = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/documents/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const getDocumentsByCategory = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/documents/getFilteredDocuments",
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

export const downloadAllDocuments = async (fileName, selectedCategories) => {
  try {
    const { status, data } = await authRequest({
      url: `/documents/downloadAllDocuments`,
      method: "POST",
      data: { fileName, selectedCategories },
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};
