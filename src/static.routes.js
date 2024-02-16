/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard PRO React layouts
import Default from "layouts/dashboards/default";
import Error404 from "pages/error/404";
// import Error500 from "pages/error/500";


// Authentication Routes
import Login from "pages/auth/login";
import SelectRole from "pages/auth/select-role";

// Panel routes
import dynamicRoutes from "./dynamic.routes";

const routes = [
  {
    name: "Dashboard",
    key: "dashboard",
    route: "/-",
    protected: true,
    component: <Default />
  },
  {
    name: "Select Role",
    key: "select-role",
    route: "/select-role",
    component: <SelectRole />,
  },
  {
    name: "Login",
    key: "login",
    route: "/login",
    component: <Login />,
  },

  ...dynamicRoutes,

  {
    name: "404",
    key: "404",
    route: "/404",
    component: <Error404 />,
  },
];

export default routes;
