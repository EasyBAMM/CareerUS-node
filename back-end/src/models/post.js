import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// const { Schema } = mongoose;

const PostSchema = new Schema({
  seq: Number,
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
    name: String,
  },
  views: {
    type: Number,
    default: 0,
  },
});

autoIncrement.initialize(mongoose.connection);
PostSchema.plugin(autoIncrement.plugin, {
  model: 'Post',
  field: 'seq',
  startAt: 1, //시작 increment : 1
  increment: 1, // 증가
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
