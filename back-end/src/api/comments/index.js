import Router from 'koa-router';
import * as commentsCtrl from './comments.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const comments = new Router();

comments.get('/', commentsCtrl.read);

const comment = new Router(); // api/comments/:id
comment.post('/', checkLoggedIn, commentsCtrl.write);
comment.patch(
  '/',
  checkLoggedIn,
  commentsCtrl.checkOwnComment,
  commentsCtrl.update,
);
comment.delete(
  '/',
  checkLoggedIn,
  commentsCtrl.checkOwnComment,
  commentsCtrl.remove,
);

comments.use('/:id', commentsCtrl.checkPostId, comment.routes());

export default comments;
