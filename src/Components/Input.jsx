


function Input({name,setName}) {
  return (
    <div className=" container-input">
    <img src={require(`../Img/search.png`)} alt="icon-search" />
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      autoFocus
      placeholder= "Searching For..."
    />
  </div>
  )
}

export default Input
