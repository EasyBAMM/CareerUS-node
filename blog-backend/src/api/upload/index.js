import Router from 'koa-router';
import * as uploadCtrl from './upload.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const upload = new Router();

upload.post('/', checkLoggedIn, uploadCtrl.singleUpload);

export default upload;
