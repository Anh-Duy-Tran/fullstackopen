import { useState } from 'react'

const Header = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = ({name, onClick}) => {
  return (
    <button onClick={onClick}> {name} </button>
  )
}

const Buttons = ({labels, onClick}) => {
  return (
    <div>
      <Button name = {labels[0]} onClick = {onClick[0]}/>
      <Button name = {labels[1]} onClick = {onClick[1]}/>
      <Button name = {labels[2]} onClick = {onClick[2]}/>
    </div>
  )
}

const Row = ({col1, col2}) => {
  return (
    <tr>
      <td>{col1}</td>
      <td>{col2}</td>
    </tr>
  )
}

const Statistics = ({labels, counts}) => {

  let all = counts.reduce((a, v) => a += v)
  if (!all) {
    return (
      <>
        <h1>statistics</h1>
        No feedback given
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Row col1 = {labels[0]} col2 = {counts[0]}/>
          <Row col1 = {labels[1]} col2 = {counts[1]}/>
          <Row col1 = {labels[2]} col2 = {counts[2]}/>
          <Row col1 = "all" col2 = {all}/>
          <Row col1 = "average" col2 = {((counts[0] - counts[2]) / all).toFixed(2)}/>
          <Row col1 = "positive" col2 = {(counts[0] / all).toFixed(2)}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const labels = ['good', 'neutral', 'bad']
  const onClick = [
    () => {
      setGood(good + 1)
    },
    () => {
      setNeutral(neutral + 1)
    },
    () => {
      setBad(bad + 1)
    }
  ] 
  const counts = [good, neutral, bad]

  return (
    <div>
      <Header/>
      <Buttons labels = {labels} onClick = {onClick}/>
      <Statistics labels = {labels} counts = {counts}/>
    </div>
  )
}

export default App