const Persons = ({people}) => {
  return (
    <>
      {people.map((p, i) => <p key = {i}> {p.name} {p.number} </p>)}
    </>
  )
}

export default Persons