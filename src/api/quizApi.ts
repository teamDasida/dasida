import { DataStructure } from "../type";
import axiosInstance from "./axios";

export const fetchHomeData = async (): Promise<DataStructure> => {
  const response = await axiosInstance.get<DataStructure>('/home');
  return response.data;
};

export const fetchWrongAnswerNotes = async (): Promise<any[]> => {
  const response = await axiosInstance.get<any[]>('/wrong-answer-notes');
  return response.data;
};
