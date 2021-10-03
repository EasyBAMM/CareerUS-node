import qs from "qs";
import client from "./client";

export const listProfiles = ({
  tag,
  username,
  search,
  keyword,
  page,
  limit,
}) => {
  const queryString = qs.stringify({
    tag,
    username,
    search,
    keyword,
    page,
    limit,
  });

  return client.get(`/api/profiles?${queryString}`);
};

export const readProfile = (id) => client.get(`/api/profiles/${id}`);

export const updateProfile = ({
  id,
  name,
  comment,
  image,
  userjob,
  email,
  site,
  works,
  skills,
}) =>
  client.patch(`/api/profiles/${id}`, {
    name,
    comment,
    image,
    userjob,
    email,
    site,
    works,
    skills,
  });
