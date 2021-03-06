import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import upload from './upload';
import comments from './comments';
import profiles from './profiles';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/upload', upload.routes());
api.use('/comments', comments.routes());
api.use('/profiles', profiles.routes());

// 라우터를 내보냅니다.
export default api;
