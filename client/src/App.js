import { Error, Landing, Register, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Alljobs,
  AddJob,
  Profile,
  SharedLayout,
  Stats,
} from "./pages/dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<Alljobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;