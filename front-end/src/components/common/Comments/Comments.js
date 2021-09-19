import React from "react";
import styles from "./Comments.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import CommentWriteContainer from "../../../containers/common/Comments/CommentWriteContainer";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const cx = classNames.bind(styles);

const datePrint = (createdAt) => {
  // const postDate = new Date(publishedDate);
  const postDate = new Date(createdAt);
  return (
    postDate.toLocaleDateString() +
    " " +
    postDate.getHours() +
    ":" +
    postDate.getMinutes()
  );
};

const CommentItem = ({ comment, showWriteButton }) => {
  const { author, text, createdAt, parentComment } = comment;

  // 글 작성자 확인
  const ownComment =
    (showWriteButton && showWriteButton._id) === (author && author._id);

  return (
    <li className={cx("comment-item", { "comment-reply": parentComment })}>
      <div className={cx("comment-area")}>
        <Link to="#" className={cx("comment-thumb")}>
          <img src={author.image} alt="thumbnail" />
        </Link>
        <div className={cx("comment-box")}>
          <div className={cx("comment-nick-box")}>
            <Link to="#">{author.username}</Link>
          </div>
          <div className={cx("comment-text-box")}>
            <p className={cx("comment-text-view")}>
              <span className={cx("text-comment")}>{text}</span>
            </p>
          </div>
          <div className={cx("comment-info-box")}>
            <span className={cx("comment-info-date")}>
              {datePrint(createdAt)}
            </span>
            {showWriteButton && (
              <Link to="#" className={cx("comment-info-btn")}>
                답글쓰기
              </Link>
            )}
          </div>
        </div>
        {ownComment && (
          <div className={cx("comment-tool")}>
            <Link to="#" className={cx("tool-update-btn")}>
              <AiFillEdit />
            </Link>
            <Link to="#" className={cx("tool-delete-btn")}>
              <AiFillDelete />
            </Link>
          </div>
        )}
      </div>
    </li>
  );
};

const Comments = ({ comments, loading, error, showWriteButton }) => {
  return (
    <div className={cx("comments-container")}>
      <div className={cx("comments-content")}>
        <div className={cx("comments-header")}>
          <Link to="#" className={cx("comments-button")}>
            <span className={cx("comments-icon")}>
              <FaRegCommentDots /> 댓글
            </span>
            <span className={cx("comments-num")}>1</span>
          </Link>
          {/* value={limit} onChange={onChangeSelect} */}
          <select>
            <option value="asc">등록순</option>
            <option value="desc">최신순</option>
          </select>
        </div>
        {/* 댓글 작성 컨테이너 */}
        {showWriteButton && <CommentWriteContainer />}
        {/* 로딩 중이 아니고, 댓글 배열이 존재할 때만 보여 줌 */}
        {!loading && comments && (
          <ul className={cx("comments")}>
            {comments.count > 0 ? (
              comments.comments.map((comment) => (
                <CommentItem
                  comment={comment}
                  key={comment._id}
                  showWriteButton={showWriteButton}
                />
              ))
            ) : (
              <li>내용없음</li>
            )}
          </ul>
        )}
        {/* <ul className={cx("comments")}>
          <li className={cx("comment-item")}>
            <div className={cx("comment-area")}>
              <Link to="#" className={cx("comment-thumb")}>
                <img
                  src="http://localhost:4000/images/default.png"
                  alt="thumbnail"
                />
              </Link>
              <div className={cx("comment-box")}>
                <div className={cx("comment-nick-box")}>
                  <Link to="#">허준범</Link>
                </div>
                <div className={cx("comment-text-box")}>
                  <p className={cx("comment-text-view")}>
                    <span className={cx("text-comment")}>댓글~</span>
                  </p>
                </div>
                <div className={cx("comment-info-box")}>
                  <span className={cx("comment-info-date")}>{datePrint()}</span>
                  <Link to="#" className={cx("comment-info-btn")}>
                    답글쓰기
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li className={cx("comment-item")}>
            <div className={cx("comment-area")}>
              <Link to="#" className={cx("comment-thumb")}>
                <img
                  src="http://localhost:4000/images/default.png"
                  alt="thumbnail"
                />
              </Link>
              <div className={cx("comment-box")}>
                <div className={cx("comment-nick-box")}>
                  <Link to="#">홍길동</Link>
                </div>
                <div className={cx("comment-text-box")}>
                  <p className={cx("comment-text-view")}>
                    <span className={cx("text-comment")}>댓글~</span>
                  </p>
                </div>
                <div className={cx("comment-info-box")}>
                  <span className={cx("comment-info-date")}>{datePrint()}</span>
                  <Link to="#" className={cx("comment-info-btn")}>
                    답글쓰기
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li className={cx("comment-item comment-reply")}>
            <div className={cx("comment-area")}>
              <Link to="#" className={cx("comment-thumb")}>
                <img
                  src="http://localhost:4000/images/1627301595464.png"
                  alt="thumbnail"
                />
              </Link>
              <div className={cx("comment-box")}>
                <div className={cx("comment-nick-box")}>
                  <Link to="#">신규진</Link>
                </div>
                <div className={cx("comment-text-box")}>
                  <p className={cx("comment-text-view")}>
                    <Link to="#" className={cx("text-nickname")}>
                      홍길동
                    </Link>
                    <span className={cx("text-comment")}>댓글~</span>
                  </p>
                </div>
                <div className={cx("comment-info-box")}>
                  <span className={cx("comment-info-date")}>{datePrint()}</span>
                  <Link to="#" className={cx("comment-info-btn")}>
                    답글쓰기
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Comments;
