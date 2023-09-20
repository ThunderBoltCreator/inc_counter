import {FC} from 'react'
import {ErrorType} from './App.tsx'
import {ISettings} from './App.tsx'


interface ICounter {
   count: number
   setCount: (n: number) => void
   settings: ISettings
   error: ErrorType
}

export const Counter: FC<ICounter> = ({setCount, count, settings, error}) => {


   const onButtonClick = () => {
      setCount(count + 1)
   }

   const onResetClick = () => {
      setCount(settings.startValue)
   }

   console.log('')
   return (
      <div className={'wrapper'}>
         <div className={`counter ${count === settings.limit && 'count-red'}`}>{error ? 'Enter valid value' : count}</div>
         <div className={'btn-box'}>
            <button disabled={count === settings.limit} onClick={onButtonClick}>inc</button>
            <button disabled={count <= 0} type="reset" onClick={onResetClick}>reset</button>
         </div>
      </div>
   )
}