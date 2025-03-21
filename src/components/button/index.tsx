import type { IButton } from "./button.types"
export function Button ({type, onClick, classNames, text}: IButton  ){
    if (type == 'progress') {
      return <button 
        className={'progress-button ' + classNames?.join(' ')} 
        onClick={onClick}>{text}
        </button>
    } else if (type === 'main') {
      return <button 
        className={'button-main ' + classNames?.join(' ')} 
        onClick={onClick}>{text}
        </button>
    }
  }