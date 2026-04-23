import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Admin from "./pages/Admin";
import Designs from "./pages/Designs";
import EmbroideryDesigns from "./pages/EmbroideryDesigns";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:type" element={<ServiceDetails />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/embroidery-designs" element={<EmbroideryDesigns />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
