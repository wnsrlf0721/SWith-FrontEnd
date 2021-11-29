import axios from './initialAxios';

export const postSignUp = async (email, password, nickname) => {
  return await axios.post('/signup', {
    email: email,
    password: password,
    nickname: nickname,
  });
};

export const postLogIn = async (email, password) => {
  return await axios.post('/login', {
    email: email,
    password: password,
  });
};

export const postCheckDuplication = async (email) => {
  return await axios.post('/signup/check-email', {
    email: email,
  });
};

export const postSendCertificationCode = async (email) => {
  return await axios.post('/signup/recieve-certificate-code', {
    email: email,
  });
};

export const postCertifiacteCode = async (email, certificationCode) => {
  return await axios.post('/signup/certificate-email', {
    email: email,
    certificationCode: certificationCode,
  });
};

export const postStudyRoom = async (studyRoomInfo) => {
  return await axios.post('/studyrooms', studyRoomInfo);
};

export const postUserStudyRoomHistory = async (userId, studyRoomId) => {
  return await axios.post('/studyrooms/history', {
    userId: userId,
    studyRoomId: studyRoomId,
  });
};

export const postUserstatistics = async (userId, studyTime, today) => {
  return await axios.post('/statistics', {
    userId: userId,
    studyTime: studyTime,
    date: today,
  });
};

export const postPlannerTask = async (userId, taskTitle, startDate, endDate) => {
  return await axios.post(`/planners/${userId}`, {
    taskDescription: taskTitle,
    startDate: startDate,
    endDate: endDate,
    complete: 0,
  });
};

export const postBoard = async (userId, boardTitle) => {
  return await axios.post(`/boards`, {
    userId: userId,
    title: boardTitle,
  });
};

export const postBoardPost = async (board_id, userId, postTitle, postContent) => {
  return await axios.post(`/boards/${board_id}/posts`, {
    userId: userId,
    title: postTitle,
    content: postContent,
  });
};

export const getUserInfo = async (userId) => {
  return await axios.get(`/users/${userId}`);
};

export const getStudyRooms = async () => {
  return await axios.get('/studyrooms');
};

export const getStudyRoomInfo = async (studyRoomId) => {
  return await axios.get(`/studyrooms/${studyRoomId}`);
};

export const getUserStudyRoomsHistory = async (userId) => {
  return await axios.get(`/studyrooms/history/${userId}`);
};

export const getUserStatistics = async (userId) => {
  return await axios.get(`/statistics/${userId}`);
};

export const getUserPlanner = async (userId) => {
  return await axios.get(`/planners/${userId}`);
};

export const getBoards = async () => {
  return await axios.get(`/boards`);
};

export const getPostList = async (board_id) => {
  return await axios.get(`/boards/${board_id}/posts`);
};

export const getPostInfo = async (board_id, post_id) => {
  return await axios.get(`/boards/${board_id}/posts/${post_id}`);
};

export const patchUserInfo = async (userId, nickname, password, beforePassword) => {
  return await axios.patch(`/users/${userId}`, {
    nickname: nickname,
    beforePassword: beforePassword,
    password: password,
  });
};

export const patchStudyRoomInfo = async (studyRoomId, studyRoomInfo) => {
  return await axios.patch(`/studyrooms/${studyRoomId}`, studyRoomInfo);
};

export const putPlannerTask = async (
  userId,
  taskId,
  taskTitle,
  startDate,
  endDate,
  complete,
) => {
  return await axios.put(`/planners/${userId}/${taskId}`, {
    taskDescription: taskTitle,
    startDate: startDate,
    endDate: endDate,
    complete: complete,
  });
};

export const deletePlannerTask = async (userId, taskId) => {
  return await axios.delete(`/planners/${userId}/${taskId}`, {});
};
