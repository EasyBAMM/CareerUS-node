import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// schema
const CommentSchema = new Schema({
  post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true }, // 게시물(필수)
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // 작성자(필수)
  parentComment: { type: mongoose.Types.ObjectId, ref: 'Comment' }, // 부모
  depth: { type: Number, default: 0 }, // 깊이
  groupno: { type: Number }, // 댓글 그룹
  text: { type: String, required: [true, 'text is required!'] },
  isDeleted: { type: Boolean }, // 중간 댓글 삭제 시 자식댓글 표시X
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
