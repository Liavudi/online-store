import Categories from "../../components/categories/categories";
import Footer from "../../components/footer/footer";
import { NavBar } from "../../components/nav-bar/nav-bar";
import "./home.css";

const categoriesList = [
  {
    id: 1,
    imageUrl: "https://www.ivory.co.il/files/catalog/org/1667983814g14Im.jpg",
    category: "Computers",
  },
  {
    id: 2,
    imageUrl: "https://www.ivory.co.il/files/catalog/org/1661683411y11Ln.jpg",
    category: "Phones",
  },
  {
    id: 3,
    imageUrl: "https://www.ivory.co.il/files/catalog/org/1666171331o31Vj.jpg",
    category: "Laptops",
  },
  {
    id: 4,
    imageUrl:
      "https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1550663499D99Qy___D!220X!.jpg",
    category: "Displays",
  },
  {
    id: 5,
    imageUrl:
      "https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1539006292a92Ms___D!220X!.jpg",
    category: "Graphic Cards",
  },
  {
    id: 6,
    imageUrl:
      "https://www.ivory.co.il/splendid_images/cache/files/catalog/reg/1657438284c84Pr___D!220X!.jpg",
    category: "Televions",
  },
];

const categoriesMap = categoriesList.map((data) => {
  return (
    <Categories
      category={data.category}
      imageUrl={data.imageUrl}
      key={data.id}
    />
  );
});

export default function Homepage() {
  return <div className="categories-container">{categoriesMap}</div>;
}
