export const Card = props => {

  const clickCard = (image) => {
    props.clickable && props.onClick(image);
  }
  
  // const src = props.img
  return (
    <div className="card" onClick={() => clickCard(props.image)}>
      <h1>{props.image}</h1>
    </div>
  )
}
