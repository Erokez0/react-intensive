import { useState, useEffect } from 'react';
import './App.css';
import { Button } from './components/button';
import './components/button/button.css';
import { data } from './data/questions';
import { ProgressBadge } from './components/progress-badge';
import reactIcon from './assets/react.svg'
import './components/progress-badge/progress-badge.css';

function App() {
  const [questions, setQuestions] = useState(data);
  const [questionIx, setQuestionIx] = useState(0);
  const [knownQuestions, setKnownQuestions] = useState(0);
  const [unknownQuestions, setUnknownQuestions] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState(0);
  const [totalQuestions] = useState(data.length)

  useEffect(() => {

    for (const question of Object.values(questions)) {
      if (question.selected === 'known') {
        setKnownQuestions(knownQuestions => knownQuestions + 1)
      } else if (question.selected === 'unknown') {
        setUnknownQuestions(unknownQuestions => unknownQuestions + 1)
      } else {
        setSkippedQuestions(skippedQuestions => skippedQuestions + 1)
      }
    }
  }, [questionIx, questions])

  const onProgressButtonClick = (operation: 'plus' | 'minus') => {
    setQuestionIx(current => operation == "plus"? current + 1 : current - 1)
  }
  const onMainButtonCLick = (type: 'known' | 'unknown') => {
    onProgressButtonClick('plus');
    setQuestions( questions => {
      const newState = {...questions};
      newState[questionIx].selected = type
      return newState
    });
  }
  return (
    <div>
      <header className='header'>
        <section className="progress">
          <progress className="progress-bar" value={1/totalQuestions*(questionIx+1)}></progress>
          {questionIx >= 1 && 
          <Button type="progress" 
            onClick={ () => onProgressButtonClick("minus")} text="&lt;" />
          }
          <span className="progress-text">{questionIx+1} / {totalQuestions}</span>
          {questionIx < totalQuestions - 1 &&
          <Button type="progress" 
          onClick={ () => onProgressButtonClick("plus")} text="&gt;" />
          }
        </section>

        <section className="badges">
          <ProgressBadge icon={reactIcon} label='Knew ' value={knownQuestions} />
          <ProgressBadge icon={reactIcon} label='Learnt ' value={unknownQuestions} />
          <ProgressBadge icon={reactIcon} label='Skipped ' value={skippedQuestions} />
        </section>

      </header>
      <main className='main'>
        <article className="question">{data[questionIx].question}</article>
        <article className="answer">{data[questionIx].answer}</article>

        <section className="main-buttons">
          <Button classNames={ 
            questions[questionIx].selected == "known" 
            ? ['button-selected']
            : []
            } 
            onClick={ () => onMainButtonCLick("known")} 
            text="I KNEW IT 🙏" type='main'/>

          <Button classNames={ 
            questions[questionIx].selected == "unknown" 
            ? ['button-selected']
            : []
            } 
            onClick={ () => onMainButtonCLick("unknown")} 
            text="IDK 😭" type='main'/>

          <Button type='main' onClick={ () => onProgressButtonClick("plus") } text='Skip 🎿'/>
        </section>
      </main>
    </div>
  )
}

export default App
