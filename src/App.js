import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ApplicationLayout,
  NotFound,
  PrivateRoute,
  UnAuthorized,
} from "./components";

import { Signup, Signin, RegistrationSuccess } from "./modules/auth";
import { OrderList } from "./modules/orderList";
import { APPROUTES } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ApplicationLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Auth Page */}
        <Route path={APPROUTES.signup} element={<Signup />} />
        <Route path={APPROUTES.signin} element={<Signin />} />
        <Route
          path={APPROUTES.registrationSuccess}
          element={<RegistrationSuccess />}
        />

        {/* Error Page */}
        <Route path="unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
