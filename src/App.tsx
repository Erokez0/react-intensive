import { useState, useEffect } from 'react';
import clsx from 'clsx';
import './App.css';
import { Button } from './components/button';
import './components/button/button.module.css';
import { data } from './data/questions';
import { ProgressBadge } from './components/progress-badge';
import reactIcon from './assets/react.svg'
import buttonStyles from './components/button/button.module.css';
import { useStore } from './store';
function App() {
  const [totalQuestions] = useState(data.length)

  const {questions, questionIx, knownQuestions, unknownQuestions, skippedQuestions, setKnownQuestions} = useStore();
  

  useEffect(() => {
    const newState = {
      'known': 0,
      'unknown': 0,
      'skipped': 0
    }
    for (const question of Object.values(questions)) {
      if (question.selected) {
        newState[question.selected] += 1;
      }
    }
    setKnownQuestions(newState.known);
    setUnknownQuestions(newState.unknown);
    setSkippedQuestions(newState.skipped);
  }, [questions])

  const onProgressButtonClick = (operation: 'plus' | 'minus') => {
    setQuestionIx(current => operation == "plus"? current + 1 : current - 1)
  }
  const onMainButtonCLick = (type: 'known' | 'unknown' | 'skipped') => {
    setQuestions( questions => {
      const newState = {...questions};
      newState[questionIx].selected = type
      return newState
    });
    onProgressButtonClick("plus");
  }
  return (
    <div>
      <header className='header'>
        <section className="progress">
          <progress className='progress-bar' value={1/totalQuestions*(questionIx+1)}></progress>
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
          <Button 
            classNames={clsx('button', questions[questionIx].selected == "known" && [buttonStyles['button-selected']])} 
            onClick={ () => onMainButtonCLick("known")} 
            text="I KNEW IT 🙏" 
            type='main'/>

          <Button classNames={clsx('button', questions[questionIx].selected == "unknown" && [buttonStyles['button-selected']])} 
            onClick={ () => onMainButtonCLick("unknown")} 
            text="IDK 😭" 
            type='main'/>

          <Button 
            type='main' 
            onClick={ () => onMainButtonCLick('skipped') } 
            text='Skip 🎿'/>
        </section>
      </main>
    </div>
  )
}

export default App
