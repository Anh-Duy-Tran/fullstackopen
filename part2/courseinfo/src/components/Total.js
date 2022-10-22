const Total  = ({parts}) => {
  return (
    <p><b>total of {parts.reduce((a, c) => a + c.exercises, 0)} exercises</b></p>
  )
}

export default Total