import { Homepage, InsertItem, Items, Item, Search } from "./pages";
import { NavBar } from "./components/nav-bar/nav-bar";
import Footer from "./components/footer/footer";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/private-route/private-route";

function App({loginStatus}) {

  return (
    <div className="App">
      <div className="all-content-but-footer">
        <NavBar loginStatus={loginStatus.user} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:category" element={<Items />} />
          <Route
            path="/insert-new-item"
            element={
              <ProtectedRoute role={loginStatus.role}>
                <InsertItem />
              </ProtectedRoute>
            }
          />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/search/:keyword" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
