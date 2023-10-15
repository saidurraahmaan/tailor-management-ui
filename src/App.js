import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APPROUTES } from "./constants/routes";
import {
  ApplicationLayout,
  NotFound,
  PrivateRoute,
  UnAuthorized,
} from "./components";
import {
  OrderList,
  NewOrder,
  OrderDetails,
  DeliveryPage,
  SuccessfulOrder,
  OrderCustomerCopy,
  OrderProductionCopy,
} from "./modules/order";
import { NewProduct, ProductList } from "./modules/product";
import { Signup, Signin, RegistrationSuccess } from "./modules/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ApplicationLayout />}>
          <Route
            path={APPROUTES.orderList}
            element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/delivery/:id"
            element={
              <PrivateRoute>
                <DeliveryPage />
              </PrivateRoute>
            }
          />
          <Route
            path={APPROUTES.orderSuccess}
            element={
              <PrivateRoute>
                <SuccessfulOrder />
              </PrivateRoute>
            }
          />
          <Route
            path={APPROUTES.newOrder}
            element={
              <PrivateRoute>
                <NewOrder />
              </PrivateRoute>
            }
          />
          <Route
            path={"/order/details/:id"}
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path={"/order/details/customercopy/:id"}
            element={
              <PrivateRoute>
                <OrderCustomerCopy />
              </PrivateRoute>
            }
          />
          <Route
            path={"/order/details/productioncopy/:id"}
            element={
              <PrivateRoute>
                <OrderProductionCopy />
              </PrivateRoute>
            }
          />
          <Route
            path={APPROUTES.product}
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path={APPROUTES.newProduct}
            element={
              <PrivateRoute>
                <NewProduct />
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
