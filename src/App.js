
import React from 'react';
import './App.css';
import Header from './Components/Header';
import StartPage from './Components/StartPage';
import Question from "./Components/Question";
import {decode} from 'html-entities';
import { nanoid } from 'nanoid'


function App() {
  const [isQuizStarted, setIsQuizStarted] = React.useState(false);
  const [allData, setAllData] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [isQuizFinished, setIsQuizFinished] = React.useState(false);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=4")
    .then(res => res.json())
    .then(data => setAllData(data))
  }, [isQuizFinished])

  function postProcessData() {
    const array = [];
    const questionArray = allData.results;
    for (let i = 0; i < questionArray.length; i++) {
      const question = questionArray[i];

      const optionArray = [];
      optionArray.push({
        word : decode(question.correct_answer),
        isCorrect : true,
      })
      for (let i = 0; i < question.incorrect_answers.length; i++) {
        optionArray.push({
          word : decode(question.incorrect_answers[i]),
          isCorrect : false,
        })
      }
      if (optionArray[0].word !== "True") {
        shuffle(optionArray);
      }
      const prmpt = decode(question.question);

      array.push({
        prompt : prmpt,
        options : optionArray,
        selection : "",
        answer : question.correct_answer,
      })
    }
    shuffle(array)
    setQuestions(array);
  }

  const questionElements = questions.map(question => {
    const id = nanoid()
    return <Question
      key={id} 
      prompt={question.prompt}
      options={question.options}
      selection={question.selection}
      answer={question.answer}
      hold={holdHandler}
      isFinished={isQuizFinished}
    />
  })

  function shuffle(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function holdHandler(event, prompt) {
    const {name, value} = event.target
    setQuestions(prev => {
      return prev.map(question => {
        return question.prompt === prompt ? {
          ...question, [name] : value }:question
      })

    })
  }

  function startQuizHandler() {
    setIsQuizStarted(true);
    postProcessData();
  }

  function finishQuizHandler() {
    const isAllFilled = questions.every((question) => question.selection !== "");
    if (isAllFilled) {
      var count = 0;
      for (let i = 0; i < questions.length; i++) {
        var q = questions[i];
        if (q.selection === q.answer) {
          count++;
        }
      }
      setScore(count)
      setIsQuizFinished(true);
    }
  }

  function plaAgainHandler() {
    setIsQuizFinished(false)
    postProcessData();
    setScore(0);
  }

  return (
    <div className="App">
      <Header />
      {
        !isQuizStarted ?
        <StartPage startQuiz={startQuizHandler}/>
        :
        <main className="questions-main">
          <div>
            {questionElements}        
          </div>
          {!isQuizFinished ? 
            <button className='check-answer' onClick={finishQuizHandler}>Check Answer</button>
            :
            <div className='finished-message'>
              <p className='score-message'>You scored {score}/{questions.length} correct answers.</p>
              <button className='check-answer' onClick={plaAgainHandler}>Play Again</button>
            </div>
          }
        </main>
      }
    </div>
  );
}

export default App;
