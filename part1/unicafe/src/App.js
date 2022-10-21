import { useState } from 'react'

const Header = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = (props) => {
  return (
    <button> {props.name} </button>
  )
}

const Buttons = ({labels}) => {
  return (
    <div>
      <Button name = {labels[0]}/>
      <Button name = {labels[1]}/>
      <Button name = {labels[2]}/>
    </div>
  )
}

const Statistics = ({labels}) => {
  return (
    <>
      <h1>statistics</h1>
      <div>
        {labels[0]}
      </div>
      <div>
        {labels[1]}
      </div>
      <div>
        {labels[2]}
      </div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const labels = ['good', 'neutral', 'bad']

  return (
    <div>
      <Header/>
      <Buttons labels = {labels}/>
      <Statistics labels = {labels}/>
    </div>
  )
}

export default App