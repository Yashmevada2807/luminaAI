import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chatbot from './components/Chatbot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className='bg-amber-300'>helooo</h1> */}
      <Chatbot/>
    </>
  )
}

export default App
