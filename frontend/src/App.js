import {
Homepage, Items
} from "./pages";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div class='App'>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:category" element={<Items />} />
    </Routes>
    </div>

  );
  
}

export default App;
