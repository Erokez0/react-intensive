import type { IButton } from "./button.types"
import styles from './button.module.css';
import clsx from "clsx";
export function Button ({type, onClick, classNames = '', text}: IButton  ){
    if (type == 'progress') {
      return (<button 
        className={clsx([styles['progress-button'], classNames ])} 
        onClick={onClick}>{text}
        </button>)
    } else if (type === 'main') {
      return (<button 
        className={clsx([styles['button-main'], ...classNames])} 
        onClick={onClick}>{text}
        </button>)
    }
  }