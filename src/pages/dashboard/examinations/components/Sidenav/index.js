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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Layout config
import { useExaminationsLayoutConfig } from "../../context";

// Component dependencies
import SidenavItem from "./components/SidenavItem";

function Sidenav() {

  const [{ sidenav }] = useExaminationsLayoutConfig();

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <SoftBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {sidenav.map((item, index) => <SidenavItem key={index} item={item} component="li" pt={index === 0 ? 0 : 1} />)}
      </SoftBox>
    </Card>
  );
}

export default Sidenav;
