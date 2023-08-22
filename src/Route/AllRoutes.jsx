import { Route, Routes } from "react-router-dom";
import { Landing } from "../Pages/Website/LandingPage/Landing";
import Home from "../Pages/Website/HomePage/Home";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { Dashboard, DashboardIndex } from "../Pages/Admin/pages";
import { useAuth } from "../context/AuthContext";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  Verify,
} from "../Pages/Auth";
import AllProducts from "../Pages/Website/AllProducts/AllProducts";
import ProductDetailPage from "../Pages/Website/Product Details/ProductDetailPage";

function AllRoutes() {
  const { userLoggedIn, users } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route
          index
          element={
            <ErrorBoundary>
              <Landing />
            </ErrorBoundary>
          }
        />
        {/* Auth Routes */}
        <Route
          path="register"
          element={users && users.length === 2 ? <Login /> : <Register />}
        />
        <Route path="login" element={<Login />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="verify" element={<Verify />} />

        {/* Shop Routes */}

        <Route
          path="product/:cat/:sub"
          element={
            <ErrorBoundary>
              <AllProducts />
            </ErrorBoundary>
          }
        />
        
      <Route
        path="details/:id"
        element={
          <ErrorBoundary>
            <ProductDetailPage />
          </ErrorBoundary>
        }
      />
      </Route>

      
      <Route
        path="/dashboard"
        element={userLoggedIn === true ? <DashboardIndex /> : <Login />}
      >
        <Route index element={<Dashboard />} />
        <Route path=":tabValue" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AllRoutes;
