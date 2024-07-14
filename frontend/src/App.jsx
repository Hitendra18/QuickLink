import { Routes, Route } from "react-router-dom";

// import "./App.css";
import UploadPage from "./pages/UploadPage";
import DownloadPage from "./pages/DownloadPage";
import GitHub from "./components/GitHub";

function App() {
  return (
    <div className="custom-body-bg">
      <Routes>
        <Route index path="/" element={<UploadPage />} />
        <Route index path="/download/:fileId" element={<DownloadPage />} />
      </Routes>
      <GitHub />
    </div>
  );
}

export default App;
