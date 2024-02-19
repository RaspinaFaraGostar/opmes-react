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

// PropType
import PropTypes from "prop-types";

// I18n
import { useTranslation } from "react-i18next";

// Icons
import IconFlowSheet from "./components/icons/FlowSheet";
import IconSourceNotes from "./components/icons/SourceNotes";
import Preliminary from "./components/icons/Preliminary";

function ActionCell({ row, onClick = () => { } }) {

  const { t } = useTranslation();

  return (
    <SoftBox display="flex" alignItems="center" gap={2} flexWrap>
      <SoftTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: "pointer", lineHeight: 0 }}
        onClick={(event) => onClick(event, 'examinations')}
      >
        <Tooltip title={t("Appointment examinations")}>
          <span>
            <IconFlowSheet />
          </span>
        </Tooltip>
      </SoftTypography>
      <SoftTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: "pointer", lineHeight: 0 }}
        onClick={(event) => onClick(event, 'status')}
      >
        <Tooltip title={t(row.IsCheck ? "Uncheck Appointment" : "Check Appointment")}>
          <span>
            {row.IsCheck ? <IconSourceNotes /> : <Preliminary />}
          </span>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

// Typechecking props
ActionCell.propTypes = {
  row: PropTypes.object,
  onClick: PropTypes.func,
}

export default ActionCell;
