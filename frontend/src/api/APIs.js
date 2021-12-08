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
  return await axios.post(`/statistics`, {
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

export const postBoard = async (title, userId) => {
  return await axios.post('/boards', {
    title: title,
    userId: userId,
  });
};

export const postBoardPost = async (board_id, userId, postTitle, postContent) => {
  return await axios.post(`/boards/${board_id}/posts`, {
    userId: userId,
    title: postTitle,
    content: postContent,
  });
};

export const postComment = async (boardId, postId, userId, comment) => {
  return await axios.post(`/boards/${boardId}/posts/${postId}/comment`, {
    userId: userId,
    comment: comment,
  });
};

export const postBanUser = async (userId, studyRoomId) => {
  return await axios.post(`/studyrooms/ban-user`, {
    userId: userId,
    studyroomId: studyRoomId,
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
  return await axios.get('/boards');
};

export const getBoardPost = async (boardId) => {
  return await axios.get(`/boards/${boardId}/posts`);
};

export const getPostInfo = async (board_id, post_id) => {
  return await axios.get(`/boards/${board_id}/posts/${post_id}`);
};

export const getBoardPostId = async (boardId, postId) => {
  return await axios.get(`/boards/${boardId}/posts/${postId}`);
};

export const getFollower = async (userId) => {
  return await axios.get(`/followers/${userId}`);
};

export const getFollowing = async (userId) => {
  return await axios.get(`/followings/${userId}`);
};

export const getBanUsers = async (studyroom_id) => {
  return await axios.get(`/studyrooms/ban-user/${studyroom_id}`);
};

export const getStudyRoomOut = async (studyroom_id) => {
  return await axios.get(`/studyrooms/${studyroom_id}/out`);
};

export const getStudyRoomEnter = async (studyroom_id) => {
  return await axios.get(`/studyrooms/${studyroom_id}/enter`);
};

export const patchUserInfo = async (userId, nickname, beforePassword, password) => {
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

export const putBoardPostId = async (boardId, postId, title, content) => {
  return await axios.put(`/boards/${boardId}/posts/${postId}`, {
    title: title,
    content: content,
  });
};

export const putComment = async (boardId, postId, commentId, comment) => {
  return await axios.put(`/boards/${boardId}/posts/${postId}/comment/${commentId}`, {
    comment: comment,
  });
};

export const deletePlannerTask = async (userId, taskId) => {
  return await axios.delete(`/planners/${userId}/${taskId}`, {});
};

export const deleteBoard = async (boardId) => {
  return await axios.delete(`/boards/${boardId}`);
};

export const deleteBoardPostId = async (boardId, postId) => {
  return await axios.delete(`/boards/${boardId}/posts/${postId}`);
};

export const deleteComment = async (boardId, postId, commentId) => {
  return await axios.delete(`/boards/${boardId}/posts/${postId}/comment/${commentId}`);
};

export const postFollow = async (senderId, receiverId) => {
  return await axios.post(`/follow/`, {
    senderId: senderId,
    receiverId: receiverId,
  });
};

export const postFollowApprove = async (senderId, receiverId) => {
  return await axios.post(`/follow-approve/`, {
    senderId: senderId,
    receiverId: receiverId,
  });
};

export const deleteFollow = async (senderId, receiverId) => {
  return await axios.delete(`/followings/`, {
    data: {
      senderId: senderId,
      receiverId: receiverId,
    },
  });
};
