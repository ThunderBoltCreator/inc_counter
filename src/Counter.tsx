import {FC} from 'react'
import {COUNT_LS_KEY} from './App.tsx'
import {ErrorType} from './App.tsx'
import {ISettings} from './App.tsx'


interface ICounter {
   count: number
   setCount: (n: number) => void
   settings: ISettings
   error: ErrorType
}

export const Counter: FC<ICounter> = ({setCount, count, settings, error}) => {
   const saveLS = (value: number) => {
      localStorage.setItem(COUNT_LS_KEY, JSON.stringify(value))
   }

   const onButtonClick = () => {
      const newCount = count + 1
      setCount(newCount)

      saveLS(newCount)
   }

   const onResetClick = () => {
      setCount(settings.startValue)
      saveLS(settings.startValue)
   }

   console.log('')
   return (
      <div className={'wrapper'}>
         <div
            className={`counter ${count === settings.limit && 'count-red'}`}>{error ? 'Enter valid value' : count}</div>
         <div className={'btn-box'}>
            <button disabled={count === settings.limit || error} onClick={onButtonClick}>inc</button>
            <button disabled={count <= 0 || error} type="reset" onClick={onResetClick}>reset</button>
         </div>
      </div>
   )
}