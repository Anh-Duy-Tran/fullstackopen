import { useState, useEffect } from 'react';
import Results from './components/Results';
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [choice, setChoice] = useState(-1)
  
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data))
  }
  
  useEffect(hook, [])
  const handleChange = (e) => {
    setQuery(e.target.value)
    setChoice(-1)
  }

  const countriesToShow = query === '' ? null : countries.filter((c) => {
    return c.name.common.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })

  return (
    <>
      <div>Find countries <input onChange={handleChange}></input></div>
      <div>
        <Results countriesToShow={countriesToShow} choice = {choice} setChoice = {setChoice}></Results>
      </div>
    </>  
  )
}

export default App;
