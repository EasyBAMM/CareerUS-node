import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import upload from './upload';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/upload', upload.routes());

// 라우터를 내보냅니다.
export default api;
