import { FC } from "react";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Authenticated from "templates/Authenticated/Authenticated";
import { auth } from "firebase";
import { onAuthStateChanged } from "firebase/auth";

// Authentication components
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import SignUpMethodMenu from "./components/Auth/Signup/components/SignUpMethodMenu";
import SignupForm from "./components/Auth/Signup/components/SignupForm";
import RecoverPassword from "./components/Auth/RecoverPassword/RecoverPassword";

/**
 * Public routes are accessible to all users, regardless of authentication status. Private routes are only accessible to authenticated users.
 *
 * To add new routes:
 * - Import the component that you want to add to the routes.
 * - Add a new object to either array.
 *
 * Example:
 *
 * const NewComponent = lazy(() => import('./pages/NewComponent/NewComponent'))
 *
 * const PublicRoutes: RouteObject[] = [
 *    {
 *       // The URL path that the route will be accessible at
 *       path: '/new-component',
 *      element: (
 *        // The component that will be rendered when the route is accessed
 *         <NewComponent />
 *     ),
 *  },
 * ]
 */

const PublicRoutes: JSX.Element = (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />}>
      <Route index element={<SignUpMethodMenu />} />
      <Route path="email" element={<SignupForm />} />
    </Route>
    <Route path="/recover-password" element={<RecoverPassword />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

const PrivateRoutes: JSX.Element = (
  <Routes>
    <Route path="/my-fits" element={<Authenticated />}>
      <Route index element={<div />} />
    </Route>
    <Route path="/fit-env/:fit-id" element={<Authenticated />}>
      <Route path="datasets" element={<div />} />
      <Route path="functions" element={<div />} />
      <Route path="parameters" element={<div />} />
    </Route>
    <Route path="*" element={<Navigate to="/my-fits" />} />
  </Routes>
);

const Routing: FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  return authenticated ? PrivateRoutes : PublicRoutes;
};

export default Routing;
