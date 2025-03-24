const ColorButton = ({color, active, onClick}) => {
    return (
      <button type="button" id={'btn-'+color} title={color} className={`color-button ${active?'active':''}`} onClick={onClick}>
      </button>
    )
  }
export default ColorButton;