const multer = require('@koa/multer');
const path = require('path');
const moment = require('moment');

// 업로드 파일 저장 경로 및 파일 이름 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, moment().format('YYYYMMDDHHmmss') + '-' + file.originalname);
  },
});
// 파일 업로드 제한
const limits = {
  fields: 10, //Number of non-file fields
  fileSize: 1024 * 1024 * 3, //File Size 3MB로 제한
  files: 1, //Number of documents
};
//파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
const upload = multer({
  storage,
  limits,
});

// 파일 업로드 시, 서버의 파일 경로 리턴
export const singleUpload = async (ctx, next) => {
  try {
    await upload.single('image')(ctx, next);
    const { filename } = ctx.file;
    // console.log(ctx.file);
    const requestOrigin = ctx.request.header.origin;
    const url = requestOrigin + 'images/' + filename;
    ctx.body = { ok: true, url: url };
  } catch (e) {
    ctx.throw(500, e);
  }
};
