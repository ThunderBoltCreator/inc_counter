import {useEffect} from 'react'
import {ChangeEvent} from 'react'
import {useState} from 'react'
import {SetStateAction} from 'react'
import {Dispatch} from 'react'
import {useRef} from 'react'
import {FormEvent} from 'react'
import {useId} from 'react'
import {FC} from 'react'
import {ErrorType} from './App.tsx'
import {ISettings} from './App.tsx'


interface ISetter {
   settings: ISettings
   setSettings: Dispatch<SetStateAction<ISettings>>
   setError: Dispatch<SetStateAction<ErrorType>>
   error: boolean
}

export const Setter: FC<ISetter> = ({setSettings, settings, setError, error}) => {
   const [max, setMax] = useState(settings.limit.toString())
   const [start, setStart] = useState(settings.startValue.toString())
   const ID_FORM = useId()

   const onFormSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const limit = maxValueRef.current?.value ? +maxValueRef.current?.value : false
      const startValue = startValueRef.current?.value ? +startValueRef.current?.value : 0

      setSettings({limit, startValue})
   }

   useEffect(() => {
      setMax(settings.limit.toString())
      setStart(settings.startValue.toString())
   }, [settings])

   useEffect(() => {
      if (+max < 0 || +start < 0 || +max < +start) {
         setError(true)
      } else {
         setError(false)
      }
   }, [max, start])

   const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setMax(e.currentTarget.value)
   }
   const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (+e.currentTarget.value < 1) {
         setError(true)
      }

      setStart(e.currentTarget.value)
   }

   const maxValueRef = useRef<HTMLInputElement>(null)
   const startValueRef = useRef<HTMLInputElement>(null)

   return (
      <div className={'wrapper'}>
         <div className={'settings'}>
            <form id={ID_FORM} onSubmit={onFormSubmitHandler}>
               <label className={'form-input'}>max value:<input value={max} ref={maxValueRef} onChange={onChangeMaxHandler} type="number"/></label>
               <label className={'form-input'}>start value:<input value={start} ref={startValueRef} onChange={onChangeStartHandler} type="number"/></label>
            </form>
         </div>
         <div className={'btn-box'}>
            <button disabled={error} type={'submit'} form={ID_FORM}>set</button>
         </div>
      </div>
   )
}