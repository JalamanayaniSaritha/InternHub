import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Jobs />} />

                <Route path="/job/:id" element={<JobDetails />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;