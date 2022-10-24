const OneResult = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l, i) => <li key = {i}>{l}</li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt=""></img>
      </div>
    </>
  )
}

export default OneResult