import {useEffect} from 'react'
import {FC} from 'react'
import {useState} from 'react'

import './App.css'
import {Counter} from './Counter.tsx'
import {Setter} from './Setter.tsx'

export interface ISettings {
   limit: number | false
   startValue: number
}

export type ErrorType = boolean

export const LIMIT_LS_KEY = 'limit'
export const START_LS_KEY = 'start'
export const COUNT_LS_KEY = 'count'
const DefaultStartValue = '0'
export const App: FC = () => {
   const [count, setCount] = useState(JSON.parse(localStorage.getItem(COUNT_LS_KEY) || localStorage.getItem(START_LS_KEY) || DefaultStartValue))
   const [settings, setSettings] = useState<ISettings>({
      limit: JSON.parse(localStorage.getItem(LIMIT_LS_KEY) || 'false'),
      startValue: JSON.parse(localStorage.getItem(START_LS_KEY) || DefaultStartValue)
   })
   const [error, setError] = useState<ErrorType>(false)

   useEffect(() => {
      setCount(settings.startValue)

      localStorage.setItem(LIMIT_LS_KEY, JSON.stringify(settings.limit))
      localStorage.setItem(START_LS_KEY, JSON.stringify(settings.startValue))
   }, [settings])

   // useEffect(() => {
   //    localStorage.setItem(COUNT_LS_KEY, JSON.stringify(count))
   // }, [count])

   const fullResetHandler = () => {
      setCount(0)
      setError(false)
      setSettings({
         limit: false,
         startValue: 0
      })
      localStorage.clear()
   }

   return (
      <>
         <div className={'app-wrapper'}>
            <div className={'info'}>
               <div>
                  start value: {settings.startValue} <br/>
                  max value: {settings.limit}
               </div>
               <button onClick={fullResetHandler}>Full Reset</button>
            </div>
            <div className={'app-wrapper-2'}>
               <Setter error={error} settings={settings} setSettings={setSettings} setError={setError}/>
               <Counter count={count} setCount={setCount} settings={settings} error={error}/>
            </div>
         </div>
      </>
   )
}
