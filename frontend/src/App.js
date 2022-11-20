import {
Homepage, InsertItem, Items, Item
} from "./pages";

import { Routes, Route } from "react-router-dom";
import FetchNewData from "./hooks/fetch-data";

function App() {
  FetchNewData();
  return (
    <div className='App'>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:category" element={<Items />} />
      <Route path="/insert-new-item" element={<InsertItem />} />
      <Route path="/:category/item/:id" element={<Item /> } />
    </Routes>
    </div>

  );
  
}

export default App;
