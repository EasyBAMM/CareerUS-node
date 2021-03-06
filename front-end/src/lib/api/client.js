import axios from "axios";

const client = axios.create();

/* 글로벌 설정
    // API 주소
    client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:4000/';

    // 헤더 설정
    client.defaults.headers.common["Authorization"] = "Bearer a1b2c3d4";

    // 인터셉터 설정
    axios.intercepter.response.use({
        response => {
            // 요청 성공 시 특정 작업 수행
            return response;
        },
        error => {
            // 요청 실패 시 특정 작업 수행
            return Promise.reject(error);
        }
    })
    
*/
// Add a request interceptor Bearer token
client.interceptors.request.use(function (config) {
  const authLogin = localStorage.getItem("authLogin");
  const token = authLogin ? JSON.parse(authLogin).accessToken : null;
  //   console.log(token);
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

export default client;
