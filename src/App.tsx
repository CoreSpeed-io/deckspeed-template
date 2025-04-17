import { Navigate } from "@tanstack/react-router";

function App() {
  return <Navigate to="/by-index/1" search={{ thumbnail: false }} />;
}

export default App;
