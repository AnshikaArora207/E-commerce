import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"
import HorizontalCard from "../components/HorizontalCard"

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCard category = {"Airpodes"} heading={"Top Airpodes"}/>
      <HorizontalCard category = {"Camera"} heading={"Top Cameras"}/>
    </div> 
  )
}

export default Home