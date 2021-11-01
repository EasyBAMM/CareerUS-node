import React, { useState, useCallback, useEffect } from "react";
import styles from "./Works.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

// Work 값이 바뀔 때만 리렌더링되도록 처리
const WorkItem = React.memo(({ work, onRemove }) => (
  <li className={cx("work")} onClick={() => onRemove(work)}>
    {work}
  </li>
));

// Works 값이 바뀔 때만 리렌더링되도록 처리
const WorkList = React.memo(({ works, onRemove }) => (
  <ul className={cx("works-list")}>
    {works.map((work) => (
      <WorkItem key={work} work={work} onRemove={onRemove} />
    ))}
  </ul>
));

const Works = ({ works, onChangeWorks }) => {
  const [input, setInput] = useState("");
  const [localWorks, setLocalWorks] = useState([]);

  const insertWork = useCallback(
    (work) => {
      if (!work) return; // 공백이라면 추가하지 않음
      if (localWorks.includes(work)) return; // 이미 존재한다면 추가하지 않음
      if (localWorks.length > 9) return; // 10개까지만 추가
      const nextWorks = [...localWorks, work];
      setLocalWorks(nextWorks);
      onChangeWorks(nextWorks);
    },
    [localWorks, onChangeWorks]
  );

  const onRemove = useCallback(
    (work) => {
      const nextWorks = localWorks.filter((t) => t !== work);
      setLocalWorks(nextWorks);
      onChangeWorks(nextWorks);
    },
    [localWorks, onChangeWorks]
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertWork(input.trim()); // 앞뒤 공백을 없앤 후 등록
      setInput(""); // input 초기화
    },
    [input, insertWork]
  );

  useEffect(() => {
    setLocalWorks(works);
  }, [works]);

  return (
    <div className={cx("works-container")}>
      <div className={cx("works-content")}>
        <form className={cx("works-form")} onSubmit={onSubmit}>
          <input placeholder="경력을 입력해주세요. (최대 10줄)" value={input} onChange={onChange} />
          <button type="submit">추가</button>
        </form>
        <WorkList works={localWorks} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default Works;
