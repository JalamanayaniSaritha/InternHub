import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import AddJob from "./pages/AddJob";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Jobs />} />
                <Route path="/job/:id" element={<JobDetails />} />
                <Route path="/add-job" element={<AddJob />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;