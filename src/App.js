
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ApplicationLayout,
  NotFound,
  // PrivateRoute,
  UnAuthorized,
} from "./components";

import {
  Auth,
  Signin,
} from "./modules/auth";



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
        <Route path="/" element={<Auth />}>
          <Route path="/signin" element={<Signin />} />
          
        </Route>

        {/* Error Page */}
        <Route path="unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
