import { Routes, Route } from "react-router-dom";

import Guns from "./pages/Guns";
import Gun from "./pages/Gun";
import CreateGun from "./pages/CreateGun";
import EditBullet from "./pages/EditBullet";
function App() {
    return (
        <div className="bg-myBackground m-0 p-0 flex flex-col min-h-screen">
            <Routes>
                <Route path="/guns" element={<Guns />} />
                <Route path="/guns/createGun" element={<CreateGun />} />
                <Route path="/gun/:id" element={<Gun />} />
                <Route path="/gun/edit_bullet/:id" element={<EditBullet />} />
            </Routes>
        </div>
    );
}
export default App;
