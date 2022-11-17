import Categories from "../components/categories/categories";
import Footer from "../components/footer/footer";
import { NavBar } from "../components/nav-bar/nav-bar";


export default function Homepage() {
  return (
   <div>
    <NavBar />
    <Categories />
    <Footer />
    </div>
  );
}