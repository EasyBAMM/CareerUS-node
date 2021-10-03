import Router from 'koa-router';
import * as profilesCtrl from './profiles.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const profiles = new Router();

profiles.get('/', profilesCtrl.list);

const profile = new Router(); // api/profiles/:id
profile.get('/', profilesCtrl.read);
profile.patch(
  '/',
  checkLoggedIn,
  profilesCtrl.checkOwnProfile,
  profilesCtrl.update,
);

profiles.use('/:id', profilesCtrl.getProfileById, profile.routes());

export default profiles;
