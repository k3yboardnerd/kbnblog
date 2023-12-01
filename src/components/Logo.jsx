import {Link} from "react-router-dom"
function Logo({className}) {
  return (
    <h1 className={ className}><Link to="/">kbn.</Link></h1>
  )
}

export default Logo