import { DataStructure } from "../type";
import axiosInstance from "./axios";
import { WrongAnswerNote } from '../types/quizTypes';

export const fetchHomeData = async (): Promise<DataStructure> => {
  const response = await axiosInstance.get<DataStructure>('/home');
  return response.data;
};

export const fetchWrongAnswerNotes = async (): Promise<WrongAnswerNote[]> => {
  const response = await axiosInstance.get<WrongAnswerNote[]>('/wrong-notes');
  return response.data;
};
