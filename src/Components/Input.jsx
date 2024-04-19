





function Input({name,setName}) {
  return (
    <div className=" container-input">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      autoFocus
    />
  </div>
  )
}

export default Input
