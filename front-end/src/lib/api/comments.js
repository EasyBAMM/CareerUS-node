// import qs from "qs";
import client from "./client";

export const writeComment = ({ id, text }) =>
  client.post(`/api/comments/${id}`, { text });

export const listComments = ({ id, page, orderBy }) =>
  client.get(`/api/comments/${id}`, { page, orderBy });

export const updateComment = ({ id, text }) =>
  client.patch(`/api/posts/${id}`, {
    text,
  });
