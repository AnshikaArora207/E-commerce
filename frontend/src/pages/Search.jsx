import { useLocation, useParams } from "react-router-dom"

const Search = () => {
    const query = useLocation();
    console.log(query);
  return (
    <div>Search</div>
  )
}

export default Search