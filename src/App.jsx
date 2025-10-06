import { Routes, Route } from "react-router-dom";
import Site from "./Site";
import MenuPrint from "./pages/MenuPrint";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Site />} />
            <Route path="menu-print" element={<MenuPrint />} />
        </Routes>
    );
}
