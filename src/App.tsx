import './App.css'
import { Calendar } from './components/Calendar'

function App() {

  const now = new Date();


  return (
    <Calendar date={now}/>
  )
}

export default App
