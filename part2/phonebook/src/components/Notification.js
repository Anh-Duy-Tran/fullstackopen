const successStyle = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 50,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({error, message }) => {
  if (error === null) {
    return null
  }


  return (
    <div style={error ? errorStyle : successStyle} className='error'>
      {message}
    </div>
  )
}

export default Notification