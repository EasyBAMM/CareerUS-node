import qs from "qs";
import client from "./client";

export const writeComment = ({ id, parentComment, toComment, text }) =>
  client.post(`/api/comments/${id}`, { parentComment, toComment, text });

export const listComments = ({ id, page, orderBy }) => {
  const queryString = qs.stringify({
    id,
    page,
    orderBy,
  });

  return client.get(`/api/comments?${queryString}`);
};

export const updateComment = ({ id, commentId, toComment, text }) =>
  client.patch(`/api/comments/${id}`, {
    commentId,
    toComment,
    text,
  });

export const removeComment = ({ id, commentId }) =>
  client.delete(`/api/comments/${id}`, { data: { commentId } });
