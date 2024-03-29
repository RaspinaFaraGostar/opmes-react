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

// React router components
import { Link } from "react-router-dom";

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

function ActionCell({ row, onClick = () => { } }) {

  const { t } = useTranslation();

  return (
    <SoftBox display="flex" alignItems="center" gap={2} flexWrap>
      <SoftTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: "pointer", lineHeight: 0 }}
        component={Link}
        to={`/panel/enginQuestion/create-question/${row.GroupQuestionId}/${row.CategoryName}`}
      // onClick={(event) => onClick(event, 'questions')}
      >
        <Tooltip title={t("Define subquestions")}>
          <Icon>quiz</Icon>
        </Tooltip>
      </SoftTypography>
      <SoftTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: "pointer", lineHeight: 0 }}
        onClick={(event) => onClick(event, 'access')}
      >
        <Tooltip title={t("Set users access")}>
          <Icon>key</Icon>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

// Typechecking props
ActionCell.propTypes = {
  row: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default ActionCell;
