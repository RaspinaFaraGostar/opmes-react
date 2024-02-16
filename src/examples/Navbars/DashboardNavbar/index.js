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

import { useEffect, useState } from "react";

// react-router components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";

// App components
import UserProfileFormDialog from "components/UserProfileFormDialog";
import UserPasswordFormDialog from "components/UserPasswordFormDialog";
import { useAuth } from "contexts/auth";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarDesktopMenu,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard PRO React context
import {
  setMiniSidenav,
  setTransparentNavbar,
  useSoftUIController
} from "contexts/soft-ui";

// Images
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

// I18n
import { useTranslation } from "react-i18next";

// Notistack
import { useSnackbar } from "notistack";

function DashboardNavbar({ absolute, light, isMini }) {

  // I18n
  const { t } = useTranslation();

  // Snackbar handlers
  const { enqueueSnackbar } = useSnackbar();

  // Auth
  const [auth, dispatchAuth, { logout, resetRole }] = useAuth();

  // Navbar methods
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Profile dialog props and handlers
  const [profileDialogProps, setProfileDialogProps] = useState({ open: false });

  // Password dialog props and handlers
  const [passwordDialogProps, setPasswordDialogProps] = useState({ open: false });

  // Menu Items
  const menuItems = [
    {
      icon: 'person',
      label: t("Profile"),
      onClick: async () => {
        try {
          handleCloseMenu();
          const response = await axios('/api/UserPanel/GetUserProfile');
          setProfileDialogProps({ open: true, initialValues: response.data });
        } catch (error) {
          enqueueSnackbar(t("An error occurred"), { variant: 'soft', color: 'error' })
        }
      }
    },
    {
      icon: 'lock',
      label: t("Change Password"),
      onClick: () => {
        handleCloseMenu();
        setPasswordDialogProps({ open: true })
      }
    },
    {
      icon: 'supervised_user_circle',
      label: t("Change Role"),
      onClick: () => resetRole()
    },
    {
      icon: 'logout',
      label: t("Logout"),
      onClick: () => logout()
    }
  ];

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
      PaperProps={{
        sx: { minWidth: 200 }
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick}>
          <ListItemIcon>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "inherit" }}>{item.label}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} /> */}
            <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </SoftBox>
          {isMini ? null : (
            <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
              <SoftBox>
                <SoftButton
                  variant="gradient"
                  color="dark"
                  sx={{ ...navbarIconButton, py: 1, px: 2 }}
                  onClick={handleOpenMenu}
                  startIcon={(
                    <Icon>
                      account_circle
                    </Icon>
                  )}
                >
                  <SoftTypography
                    variant="button"
                    fontWeight="medium"
                    color="inherit"
                  >
                    {auth.user.FullName}
                  </SoftTypography>
                </SoftButton>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon className={light ? "text-white" : "text-dark"}>
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>
                {renderMenu()}
              </SoftBox>
            </SoftBox>
          )}
        </Toolbar>
      </AppBar>

      <UserProfileFormDialog
        {...profileDialogProps}
        onClose={() => setProfileDialogProps({ open: false })}
        onSubmitSuccess={response => {
          enqueueSnackbar(response, { variant: 'soft', icon: 'check', color: 'success' });
          setProfileDialogProps({ open: false })
          dispatchAuth({ type: "REVOKE_TOKEN" });
        }}
      />

      <UserPasswordFormDialog
        {...passwordDialogProps}
        onClose={() => setPasswordDialogProps({ open: false })}
        onSubmitSuccess={response => {
          enqueueSnackbar(response, { variant: 'soft', icon: 'check', color: 'success' });
          setPasswordDialogProps({ open: false })
        }}
      />

    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
