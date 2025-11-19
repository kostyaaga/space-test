import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/idnex.tsx";
import Home from "./pages/Home";
import ItemsDetails from "./pages/ItemsDetails";
import CreateItem from "./pages/CreateItem";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create_item" element={<CreateItem />} />
        <Route path="/item/:id" element={<ItemsDetails />} />
      </Routes>
    </>
  );
}

export default App;
