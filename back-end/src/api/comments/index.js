import Router from 'koa-router';
import * as commentsCtrl from './comments.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const comments = new Router();

const comment = new Router(); // /api/comments/:id
comment.get('/', commentsCtrl.read);
comment.post('/', checkLoggedIn, commentsCtrl.write);

comments.use('/:id', commentsCtrl.checkPostId, comment.routes());

export default comments;
