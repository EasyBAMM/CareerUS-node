import React, { useState, useCallback, useEffect } from "react";
import styles from "./Skills.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

// Skill 값이 바뀔 때만 리렌더링되도록 처리
const SkillItem = React.memo(({ skill, onRemove }) => (
  <li className={cx("skill")} onClick={() => onRemove(skill)}>
    {skill}
  </li>
));

// Skills 값이 바뀔 때만 리렌더링되도록 처리
const SkillList = React.memo(({ skills, onRemove }) => (
  <ul className={cx("skills-list")}>
    {skills.map((skill) => (
      <SkillItem key={skill} skill={skill} onRemove={onRemove} />
    ))}
  </ul>
));

const Skills = ({ skills, onChangeSkills }) => {
  const [input, setInput] = useState("");
  const [localSkills, setLocalSkills] = useState([]);

  const insertSkill = useCallback(
    (skill) => {
      if (!skill) return; // 공백이라면 추가하지 않음
      if (localSkills.includes(skill)) return; // 이미 존재한다면 추가하지 않음
      if (localSkills.length > 9) return; // 10개까지만 추가
      const nextSkills = [...localSkills, skill];
      setLocalSkills(nextSkills);
      onChangeSkills(nextSkills);
    },
    [localSkills, onChangeSkills]
  );

  const onRemove = useCallback(
    (skill) => {
      const nextSkills = localSkills.filter((t) => t !== skill);
      setLocalSkills(nextSkills);
      onChangeSkills(nextSkills);
    },
    [localSkills, onChangeSkills]
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertSkill(input.trim()); // 앞뒤 공백을 없앤 후 등록
      setInput(""); // input 초기화
    },
    [input, insertSkill]
  );

  useEffect(() => {
    setLocalSkills(skills);
  }, [skills]);

  return (
    <div className={cx("skills-container")}>
      <div className={cx("skills-content")}>
        <form className={cx("skills-form")} onSubmit={onSubmit}>
          <input placeholder="기술스택을 입력해주세요. (최대 10줄)" value={input} onChange={onChange} />
          <button type="submit">추가</button>
        </form>
        <SkillList skills={localSkills} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default Skills;
