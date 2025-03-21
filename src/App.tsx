import { useState } from 'react';
import './App.css';

type Question = {
  question: string,
  answer: string,
  selected?: 'known' | 'unknown'
}

type Data = Question[];
interface IButton {
  type: 'progress' | 'main',
  onClick: () => void,
  classNames?: string[],
  text: string

}
function Button({type, onClick, classNames, text}): IButton {
  if (type == 'progress') {
    return <button 
      className={'progress-button'+classNames.join(' ')} 
      onClick={onClick}>{text}
      </button>
  } else if (type === 'main') {
    return <button 
      className={'button-main'+classNames.join(' ')} 
      onClick={onClick}>{text}
      </button>
  }
}

const data: Data = [
  {
    question : 'What is React?',
    answer: 'UI library'
  },
  {
    question : 'What is HTML?',
    answer: 'Markup language'
  },
  {
    question : 'What is HTTP?',
    answer: 'Networking protocol'
  },
  {
    question : 'What is JSX?',
    answer: 'Format for dynamic rendering HTML'
  }
]
function App() {
  const [questions, setQuestions] = useState(data)
  const [questionIx, setQuestionIx] = useState(0)
  const [totalQuestions /*, setTotalQuestions*/] = useState(data.length)
  const onProgressButtonClick = (operation: 'plus' | 'minus') => {
    setQuestionIx(current => operation == "plus"? current + 1 : current - 1)
  }
  const onMainButtonCLick = (type: 'known' | 'unknown') => {
    onProgressButtonClick('plus');
    setQuestions( questions => {
      const newState = {...questions};
      newState[questionIx].selected = type
      return newState
    })
  }
  return (
    <div>
      <header className='header'>
        <section className="progress">
          <progress className="progress-bar" value={1/totalQuestions*(questionIx+1)}></progress>
          {questionIx >= 1 && 
          <button className="progress-button"
            onClick={ () => onProgressButtonClick("minus")}>&lt;</button>
          }
          <span className="progress-text">{questionIx+1} / {totalQuestions}</span>
          {questionIx < totalQuestions - 1 &&
          <button className="progress-button" 
            onClick={ () => onProgressButtonClick("plus")}>&gt;</button>
          }
        </section>
      </header>
      <main className='main'>
        <article className="question">{data[questionIx].question}</article>
        <article className="answer">{data[questionIx].answer}</article>

        <section className="main-buttons">
          <button 
          className={ questions[questionIx].selected == "known" 
            ? 'main-button button-selected' 
            : 'main-button'} 
          onClick={ () => onMainButtonCLick("known") }>I KNEW IT 🙏</button>
          <button className={ questions[questionIx].selected == "unknown" 
            ? 'main-button button-selected' 
            : 'main-button'} 
          onClick={ () => onMainButtonCLick("unknown") }>Idk 😭</button>
          <button className="main-button" 
          onClick={ () => onProgressButtonClick("plus") }>Skip 🎿</button>
        </section>
      </main>
    </div>
  )
}

export default App
