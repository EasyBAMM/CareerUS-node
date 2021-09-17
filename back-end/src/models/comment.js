import mongoose, { Schema } from 'mongoose';

// schema
const CommentSchema = new Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true }, // 게시물(필수)
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // 작성자(필수)
    parentComment: { type: mongoose.Types.ObjectId, ref: 'Comment' }, // 부모댓글(필수X)
    text: { type: String, required: [true, 'text is required!'] },
    isDeleted: { type: Boolean }, // 중간 댓글 삭제 시 자식댓글 표시X
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    toObject: { virtuals: true },
  },
);

CommentSchema.virtual('ChildComments')
  .get(function () {
    return this._childComments;
  })
  .set(function (value) {
    this._childComments = value;
  });

// model & export
const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
