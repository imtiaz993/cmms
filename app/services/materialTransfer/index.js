import { authRequest } from "../requestHandler";

export const getMaterialTransferData = async () => {
  try {
    const { status, data } = await authRequest({
      url: "/material-transfer/get",
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const addMaterialTransfer = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/material-transfer/add",
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

export const saveDraftMaterialTransfer = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/material-transfer/saveDraft",
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

export const getFilteredMT = async (values) => {
  try {
    const { status, data } = await authRequest({
      url: "/material-transfer/getFilteredMT",
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

export const getMaterialTransferByStatus = async (value) => {
  try {
    const { status, data } = await authRequest({
      url: "/material-transfer/getMaterialTransferByStatus",
      method: "POST",
      data: value,
    });
    return { status, data };
  } catch (e) {
    if (e.data) {
      return { status: e.status, data: e.data };
    }
  }
};

export const printMaterialTransfer = async (values) => {
  //value could be status (List of MTs based on status)
  try {
    const { status, data } = await authRequest({
      url: "/material-transfer/print",
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

export const exportMaterialTransfer = async (values) => {
  //value could be status (List of MTs based on status)
  try {
    const { status, data } = await authRequest({
      url: "/material-transfer/export",
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