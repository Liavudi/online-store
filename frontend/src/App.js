import {
Homepage, InsertItem, Items, Item, Search
} from "./pages";
import { NavBar } from "./components/nav-bar/nav-bar";
import Footer from "./components/footer/footer";

import { Routes, Route } from "react-router-dom";
import FetchNewData from "./hooks/fetch-data";

function App() {
  FetchNewData();
  return (
    <div className='App'>
       <div className="all-content-but-footer">
        <NavBar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:category" element={<Items />} />
      <Route path="/insert-new-item" element={<InsertItem />} />
      <Route path="/item/:id" element={<Item /> } />
      <Route path="/search/:keyword" element={<Search />} />
    </Routes>
    </div>
      <Footer />
    </div>

  );
  
}

export default App;
