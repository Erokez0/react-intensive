import clsx from 'clsx';
import './App.css';
import { Button } from './components/button';
import './components/button/button.module.css';
import { ProgressBadge } from './components/progress-badge';
import reactIcon from './assets/react.svg'
import buttonStyles from './components/button/button.module.css';
import { useStore } from './store';
function App() {

  const {
    questions, 
    questionIx, 
    setQuestionIx, 
    updateQuestion,
    stats
    } = useStore();
  
  const totalQuestions = questions.length;

  const onProgressButtonClick = (operation: 'plus' | 'minus') => {
    setQuestionIx(operation == 'plus' ? questionIx + 1 : questionIx - 1)
  }
  const onMainButtonCLick = (type: 'known' | 'unknown' | 'skipped') => {
    updateQuestion(type)
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
          <ProgressBadge icon={reactIcon} label='Knew ' value={stats.known} />
          <ProgressBadge icon={reactIcon} label='Learnt ' value={stats.unknown} />
          <ProgressBadge icon={reactIcon} label='Skipped ' value={stats.skipped} />
        </section>

      </header>
      <main className='main'>
        <article className="question">{questions[questionIx].question}</article>
        <article className="answer">{questions[questionIx].answer}</article>

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
