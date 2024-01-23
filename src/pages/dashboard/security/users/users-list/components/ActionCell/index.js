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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// I18n
import { useTranslation } from "react-i18next";

function ActionCell() {

  const { t } = useTranslation();

  return (
    <SoftBox display="flex" alignItems="center" gap={2} flexWrap>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title={t("Edit user")}>
          <Icon>edit</Icon>
        </Tooltip>
      </SoftTypography>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title={t("Assign role")}>
          <Icon>supervisor_account</Icon>
        </Tooltip>
      </SoftTypography>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title={t("Log reports")}>
          <Icon>history</Icon>
        </Tooltip>
      </SoftTypography>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title={t("Change password")}>
          <Icon>lock</Icon>
        </Tooltip>
      </SoftTypography>
      <SoftTypography variant="body1" color="error" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title={t("Delete user")}>
          <Icon>delete</Icon>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

export default ActionCell;
