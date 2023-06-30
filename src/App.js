import "./app.css"
import HomePage from "./pages/Home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AlbumPage from "./pages/Album/AlbumPage";

function App() {
  return (
      <BrowserRouter>
          <div className={'w-9/12 m-auto'}>
              <Routes>
                  <Route path={'/'} element={<HomePage/>}/>
                  <Route path={'/:id'} element={<AlbumPage/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
