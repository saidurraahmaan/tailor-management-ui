import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ApplicationLayout,
  NotFound,
  // PrivateRoute,
  UnAuthorized,
} from "./components";

import { Signup, Signin } from "./modules/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ApplicationLayout />}>
          {/* <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          /> */}
        </Route>

        {/* Auth Page */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Error Page */}
        <Route path="unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
