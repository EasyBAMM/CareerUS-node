import qs from "qs";
import client from "./client";

export const writeComment = ({ id, text, parentComment }) =>
  client.post(`/api/comments/${id}`, { text, parentComment });

export const listComments = ({ id, page, orderBy }) => {
  const queryString = qs.stringify({
    id,
    page,
    orderBy,
  });

  return client.get(`/api/comments?${queryString}`);
};

export const updateComment = ({ id, text }) =>
  client.patch(`/api/posts/${id}`, {
    text,
  });
