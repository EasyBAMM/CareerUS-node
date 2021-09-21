import Router from 'koa-router';
import * as commentsCtrl from './comments.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const comments = new Router();

comments.get('/', commentsCtrl.read); // api/comments?id=6146a56f4b93055f4c64e506&page=1&orderBy=asc

const comment = new Router(); // /api/comments/:id
comment.post('/', checkLoggedIn, commentsCtrl.write);

comments.use('/:id', commentsCtrl.checkPostId, comment.routes());

export default comments;
