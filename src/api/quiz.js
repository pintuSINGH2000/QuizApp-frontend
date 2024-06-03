import axios from "axios";
import { toast } from "react-toastify";
// process.env.REACT_APP_BACKEND_URL
const backendUrl = "http://127.0.0.1:8080/api/v1/";


export const createQuiz = async (quizData) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.post(`${backendUrl}quiz/create-quiz`, quizData);
    toast.success(res?.data?.message);
    return res?.data?.quiz;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getQuestion = async (id) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.get(`${backendUrl}quiz/get-question/${id}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const updateQuiz = async (quizId,quizData) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.post(`${backendUrl}quiz/update-quiz/${quizId}`, quizData);
    toast.success(res?.data?.message);
    return res?.data?.quiz;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const feedbackApi = async (id,quizType, quizData) => {
  try {
    const res = await axios.post(`${backendUrl}quiz/feedback/${id}`, {
      quizType,
      quizData,
    });
    return res?.data?.totalCorrect;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getQuizData = async (id) => {
  try {
    const res = await axios.get(`${backendUrl}quiz/get-quiz/${id}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const getQuizAnalyticsData = async (skip, impression) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.get(
      `${backendUrl}quiz/get-quiz-analysis?skip=${skip}&impression=${impression}`
    );
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const deleteQuiz = async (id) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.delete(`${backendUrl}quiz/delete-quiz/${id}`);
    toast.success(res?.data?.message);
    return res.data?.deleted;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getQuestionAnalysisData = async (id) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.get(
      `${backendUrl}quiz/get-question-analysys/${id}`
    );
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};
