import OneResult from "./OneResult";

const Results = ({ countriesToShow, choice, setChoice }) => {
  const handleClick = (e) => {
    setChoice(Number.parseInt(e.target.value))
  }

  if (countriesToShow === null) {
    return
  }

  if (countriesToShow.length === 1) {
    return ( <OneResult country={countriesToShow[0]}></OneResult>)
  }

  if (countriesToShow.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  }

  return (
    <>
      {countriesToShow.map((c, i) => {
        return (
        <div key = {i}>
          <div>
            {c.name.common} <button onClick={handleClick} value = {i}>Show</button>
          </div>
          {choice === i ? <OneResult country={c}></OneResult> : <></>}
        </div>
      )}
      )}
    </>
  )
}

export default Results