const multer = require('@koa/multer');
const path = require('path');

// 업로드 파일 저장 경로 및 파일 이름 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});
// 파일 업로드 제한
const limits = {
  fields: 10, //Number of non-file fields
  fileSize: 500 * 1024, //File Size Unit b
  files: 1, //Number of documents
};
//파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
const upload = multer({
  storage,
  limits,
});

export const singleUpload = async (ctx, next) => {
  try {
    await upload.single('image')(ctx, next);
    const { filename } = ctx.file;
    console.log(ctx.file);
    const url = 'images/' + filename;
    ctx.body = { ok: true, url: url };
  } catch (e) {
    ctx.throw(500, e);
  }
};
