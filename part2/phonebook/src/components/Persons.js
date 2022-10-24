const Persons = ({people, onDeleteClick}) => {
  return (
    <>
      {people.map((p, i) => 
      <p key = {i}> {p.name} {p.number} <button onClick={onDeleteClick} value = {p.id}>delete</button></p>
      )}
    </>
  )
}

export default Persons