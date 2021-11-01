import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Write from "../../components/Write/Write";
import { changeField, initialize } from "../../modules/write";

const WriteContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );
  // 언마운트될 때 초기화
  useEffect(() => {
    document.getElementById("root").scrollTo(0, 0); // 페이지 이동 후 스크롤 탑
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Write onChangeField={onChangeField} title={title} body={body} />;
};

export default WriteContainer;
