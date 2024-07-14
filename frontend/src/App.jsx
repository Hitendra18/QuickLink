import { Routes, Route } from "react-router-dom";

// import "./App.css";
import UploadPage from "./pages/UploadPage";
import TestPage from "./pages/TestPage";
import DownloadPage from "./pages/DownloadPage";
import GitHub from "./components/GitHub";

function App() {
  return (
    <div className="custom-body-bg">
      <Routes>
        <Route index path="/" element={<UploadPage />} />
        <Route index path="/download/:fileId" element={<DownloadPage />} />
        <Route index path="/test" element={<TestPage />} />
      </Routes>
      <GitHub />
    </div>
  );
}

export default App;
