import apiClient from "./../../interceptor/interceptor.service";

export const getMyTickets = async (pageNumber = 0, perPage = 100) => {
  try {
    const response = await apiClient.get(
      `/ticket/AllTicketsMineUser?pageNumber=${pageNumber}&perPage=${perPage}`,
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const createTicketBase = async (ticketData) => {
  try {
    const response = await apiClient.post("/ticket/createTicket", ticketData);
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getTicketDetailUser = async (ticketId) => {
  try {
    const response = await apiClient.get(
      `/ticket/message/chatDetailUser/${ticketId}`,
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const sendTicketMessageUser = async (messageData) => {
  try {
    const response = await apiClient.post(
      "/ticket/message/sendUser",
      messageData,
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const closeTicketUser = async (ticketId) => {
  try {
    const response = await apiClient.patch(`/ticket/closeTicket/${ticketId}`);
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getTicketAutoComplete = async (text) => {
  try {
    const response = await apiClient.get(`/ticket/autoComplete/${text}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const addTicketOverview = async (data) => {
  try {
    const response = await apiClient.post(
      "/ticket/ExistTicket/addOverview",
      data,
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
