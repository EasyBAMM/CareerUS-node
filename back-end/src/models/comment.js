import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// schema
const CommentSchema = new Schema({
  post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true }, // 게시물(필수)
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // 작성자(필수)
  parentComment: { type: mongoose.Types.ObjectId, ref: 'Comment' }, // 부모
  toComment: { type: String }, // 참조하는 댓글표시
  depth: { type: Number, default: 0 }, // 깊이
  groupno: { type: Number }, // 댓글 그룹번호
  groupord: { type: Number, default: 0 }, // 댓글 그룹정렬
  text: { type: String, required: [true, 'text is required!'] },
  isDeleted: { type: Boolean, default: false }, // 댓글 삭제
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

autoIncrement.initialize(mongoose.connection);
CommentSchema.plugin(autoIncrement.plugin, {
  model: 'Comment',
  field: 'groupno',
  startAt: 1, //시작 increment : 1
  increment: 1, // 증가
});

// model & export
const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
