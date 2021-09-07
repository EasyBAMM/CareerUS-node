import client from "./client";

// 이미지 업로드
export const upload = (formData) =>
  client({
    method: "post",
    url: "/api/upload",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
