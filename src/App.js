/**
=========================================================
* React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useMemo, useState } from "react";

// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Mui-x Datepicker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'

// React components
import ProtectedRoute from "components/ProtectedRoute";

// React example components
import Sidenav from "examples/Sidenav";

// React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

// React routes
import dynamicRoutes from "dynamic.routes";
import staticRoutes from "static.routes";

// React contexts
import { setMiniSidenav, useSoftUIController } from "contexts/soft-ui";

// Images
import brand from "assets/images/logo.png";

// Helmet
import { Helmet } from "react-helmet";

// I18n
import "i18n/i18n";
import { useTranslation } from "react-i18next";

// Lodash methods
import filter from "lodash/filter";
import find from "lodash/find";
import join from "lodash/join";
import map from "lodash/map";

// Axios
import axios from "axios";

// Auth
import { useAuth } from "contexts/auth";

// Snackbar context
import SnackbarProvider from "contexts/snackbar";


export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // i18n
  const { t } = useTranslation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Handle routes
  const [auth] = useAuth();
  const [allRoutes, setAllRoutes] = useState([]);
  const mapResponseRouteRecursively = (route, allRoutes) => {
    const children = filter(allRoutes, subRoute => subRoute.ParentId == route.MenuId);

    return ({
      name: route.Title,
      key: route.MenuId,
      // icon: route.IconName,
      icon: 'radio_button_checked',
      protected: true,
      ...(route.Url && {
        route: route.Url,
        ...find(dynamicRoutes, item => item.route == route.Url)
      }),
      ...(children.length > 0 && {
        type: "collapse",
        collapse: map(children, subRoute => mapResponseRouteRecursively(subRoute, allRoutes))
      })
    });
  };

  const mapResponseRoutes = (routes) => {
    return map(filter(routes, r => !r.ParentId), subRoute => mapResponseRouteRecursively(subRoute, routes));
  }
  const fetchDynamicRoutesAsync = async () => {
    const response = await axios('api/Permissions/AccessMenu');

    setAllRoutes([...staticRoutes, ...mapResponseRoutes(response.data)]);
  }
  const getRoutes = (routes) => {
    return routes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route
          exact
          path={route.route}
          element={route.protected ? <ProtectedRoute>{route.component}</ProtectedRoute> : route.component}
          key={route.key}
        />;
      }

      return null;
    })
  }
  useMemo(() => {
    if (auth.user && auth.user.RoleCode)
      fetchDynamicRoutesAsync();
    else
      setAllRoutes(staticRoutes);
  }, [auth]);

  const content = (
    <ThemeProvider theme={direction == "rtl" ? themeRTL : theme}>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <SnackbarProvider>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName={t("Raspina Faragostar")}
                routes={allRoutes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            </>
          )}
          <Routes>
            {getRoutes(allRoutes)}
            <Route path="*" element={<Navigate to="/-" />} />
          </Routes>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );

  // Return null when proccessing
  if (allRoutes.length < 1) return null;

  return (
    <>
      <Helmet titleTemplate={join(["%s", t("Raspina Faragostar")], " | ")} />

      {direction == "rtl" ? (
        <CacheProvider value={rtlCache}>
          {content}
        </CacheProvider>
      ) : content}
    </>
  );
}
