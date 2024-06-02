import React from "react";
import styles from "./question.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DEFAULT_TIMER } from "../../utils/constant";

const Question = ({
  questions,
  setQuestions,
  index,
  quizType,
  questionError,
  optionType,
  setOptionType,
}) => {
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "optionType") {
      value = Number(value);
    }
    const updatedQuestions = [...questions];

    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [name]: value,
    };
    updateQuestion(updatedQuestions[index]);
  };
  const updateQuestion = (updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  // Add more Options
  const addOptions = () => {
    if (questions[index].options.length === 4) return;
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push({ text: "", imgUrl: "" });
    updateQuestion(updatedQuestions[index]);
  };
  // remove extra options
  const removeOptions = (ind) => {
    if (ind < 2 || ind > 3) return;
    const updatedQuestions = [...questions];
    updatedQuestions[index].options = updatedQuestions[index].options.filter(
      (option, i) => i !== ind
    );
    if (updatedQuestions[index].correctAns === ind) {
      updatedQuestions[index].correctAns = -1;
    }
    updateQuestion(updatedQuestions[index]);
  };

  //select ans
  const selectAnswer = (ind) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAns = ind;
    updateQuestion(updatedQuestions[index]);
  };

  const handleTimer = (time) => {
    const updatedQuestion = [...questions];
    updatedQuestion[index].timer = time;
    updateQuestion(updatedQuestion[index]);
  };

  const updateOptions = (e, ind, type) => {
    const updatedQuestions = [...questions];
    const updatedOption = {
      ...updatedQuestions[index].options[ind],
      [type === 1 ? "text" : "imgUrl"]: e.target.value,
    };
    updatedQuestions[index].options[ind] = updatedOption;
    updateQuestion(updatedQuestions[index]);
    return;
  };
  return (
    <div className={styles.container}>
      <input
        className={`${styles.questionName} poppins-500 border-none border-radius-primary`}
        type="text"
        name="questionName"
        placeholder={quizType === 2 ? "Poll Question" : "Question"}
        value={questions[index].questionName}
        onChange={handleChange}
      />
      {questionError[index]?.questionName && (
        <p className={`${styles.error} poppins-500`}>
          {questionError[index].questionName}
        </p>
      )}
      <div className={`${styles.questionType} flexbox-space-between`}>
        <div className={`${styles.optionType} poppins-500 flexbox-center`}>
          Option Type
        </div>
        <div className={`${styles.optionType} poppins-500 flexbox-center`}>
          <input
            type="radio"
            id="option1"
            name="optionType"
            value="1"
            checked={optionType === 1}
            className={styles.radio}
            onClick={(e) => setOptionType(1)}
            readOnly
          />
          <label htmlFor="option1">Text</label>
        </div>
        <div className={`${styles.optionType} poppins-500 flexbox-center`}>
          <input
            type="radio"
            id="option2"
            name="optionType"
            value="2"
            checked={optionType === 2}
            readOnly
            className={styles.radio}
            onClick={(e) => setOptionType(2)}
          />
          <label htmlFor="option2">Image URL</label>
        </div>
        <div className={`${styles.optionType} poppins-500 flexbox-center`}>
          <input
            type="radio"
            id="option3"
            name="optionType"
            value="3"
            className={styles.radio}
            onClick={(e) => setOptionType(3)}
            checked={optionType === 3}
            readOnly
          />
          <label htmlFor="option3">Text & Image URL</label>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.options}>
          {questionError[index]?.optionsError && (
            <p className={`${styles.error} poppins-500`}>
              {questionError[index].optionsError}
            </p>
          )}
          {questions[index].options.map((option, ind) =>
            optionType === 1 ? (
              <div key={ind} className={styles.option}>
                {quizType === 1 && (
                  <input
                    className={`${styles.radio} ${styles.optionRadio}`}
                    type="radio"
                    name="options"
                    checked={questions[index].correctAns === ind}
                    onChange={() => selectAnswer(ind)}
                    readOnly
                  />
                )}
                <input
                  className={`${styles.input} poppins-500 ${
                    questions[index].correctAns === ind
                      ? styles.selected
                      : styles.normal
                  } ${quizType === 2 && styles.marginleft50}`}
                  type="text"
                  value={questions[index].options[ind].text}
                  placeholder="Text"
                  onChange={(e) => updateOptions(e, ind, 1)}
                />
                {ind > 1 && (
                  <RiDeleteBin6Fill
                    className={`${styles.deleteIcon} cursor-pointer`}
                    onClick={() => removeOptions(ind)}
                  />
                )}
              </div>
            ) : optionType === 2 ? (
              <div key={ind} className={styles.option}>
                {quizType === 1 && (
                  <input
                    className={`${styles.radio} ${styles.optionRadio}`}
                    type="radio"
                    name="options"
                    id={ind + 1}
                    checked={questions[index].correctAns === ind}
                    onChange={() => selectAnswer(ind)}
                    readOnly
                  />
                )}
                <input
                  className={`${styles.input} poppins-500 ${
                    questions[index].correctAns === ind
                      ? styles.selected
                      : styles.normal
                  } ${quizType === 2 && styles.marginleft50}`}
                  type="url"
                  value={questions[index].options[ind].imgUrl}
                  onChange={(e) => updateOptions(e, ind, 2)}
                  placeholder="Image Url"
                />
                {ind > 1 && (
                  <RiDeleteBin6Fill
                    className={`${styles.deleteIcon} cursor-pointer`}
                    onClick={() => removeOptions(ind)}
                  />
                )}
              </div>
            ) : (
              <div key={ind} className={styles.option}>
                {quizType === 1 && (
                  <input
                    className={`${styles.radio} ${styles.optionRadio}`}
                    type="radio"
                    name="options"
                    id={ind + 1}
                    checked={questions[index].correctAns === ind}
                    onChange={() => selectAnswer(ind)}
                    readOnly
                  />
                )}
                <input
                  className={`${styles.input} poppins-500 ${styles.width30} ${
                    questions[index].correctAns === ind
                      ? styles.selected
                      : styles.normal
                  } ${quizType === 2 && styles.marginleft50}`}
                  type="text"
                  value={questions[index].options[ind].text}
                  placeholder="Text"
                  onChange={(e) => updateOptions(e, ind, 1)}
                />
                <input
                  className={`${styles.input} poppins-500 ${
                    questions[index].correctAns === ind
                      ? styles.selected
                      : styles.normal
                  }`}
                  type="url"
                  value={questions[index].options[ind].imgUrl}
                  placeholder="Image Url"
                  onChange={(e) => updateOptions(e, ind, 2)}
                />
                {ind > 1 && (
                  <RiDeleteBin6Fill
                    className={`${styles.deleteIcon} cursor-pointer`}
                    onClick={() => removeOptions(ind)}
                  />
                )}
              </div>
            )
          )}
          {questions[index]?.options?.length < 4 && (
            <button
              className={`${styles.addOptions} poppins-500 cursor-pointer bg-white border-radius-primary border-none`}
              onClick={addOptions}
            >
              Add Option
            </button>
          )}
          {questionError[index]?.correctAns && (
            <p className={`${styles.error} poppins-500`}>
              {questionError[index].correctAns}
            </p>
          )}
        </div>
        {quizType === 1 && (
          <div className={`${styles.timer} poppins-500 text-center`}>
            <h2>Timer</h2>
            {DEFAULT_TIMER.map((timer, ind) => (
              <button
              key={index+"timer"+ind}
                className={`${
                  styles.timerbtn
                } bg-white border-none cursor-pointer border-radius-primary ${
                  questions[index].timer === ind && styles.selectedTimer
                }`}
                onClick={() => handleTimer(ind)}
              >
                {timer} {ind > 0 && "sec"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
