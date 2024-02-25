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

// React componets
import { useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBadge from "components/SoftBadge";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// I18n
import { useTranslation } from "react-i18next";

// React router dom components
import { Link, useParams } from "react-router-dom";


function SidenavItem({ item, ...props }) {

    // I18n
    const { t } = useTranslation();

    // Current location
    const params = useParams();

    // Expanded state
    const [expanded, setExpanded] = useState(false);

    // Render helper methods
    const hasChildren = item.children && item.children.length > 0;
    const isActive = params.groupQuestionId && params.groupQuestionId == item.GroupQuestionId;
    const basePath = `/panel/HealthMedicine/HealthMedicinePage/${params.patientId}/${params.periodId}/${params.doctorAppointmentDtlId}/${params.trunDate}/${params.isCheck}`;

    return (
        <SoftBox {...props}>
            <SoftTypography
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
                flexGrow={1}
                display="inline-flex"
                sx={({
                    borders: { borderRadius },
                    functions: { pxToRem },
                    palette: { light },
                    transitions,
                }) => ({
                    display: "flex",
                    cursor: 'pointer',
                    alignItems: "center",
                    borderRadius: borderRadius.md,
                    padding: `${pxToRem(10)} ${pxToRem(16)}`,
                    transition: transitions.create("background-color", {
                        easing: transitions.easing.easeInOut,
                        duration: transitions.duration.shorter,
                    }),

                    "&:hover": {
                        backgroundColor: light.main,
                    },

                    ...(isActive && {
                        backgroundColor: light.main
                    })
                })}

                {...(hasChildren && {
                    onClick: () => setExpanded(!expanded)
                })}

                {...(!hasChildren && {
                    component: Link,
                    to: [basePath, item.GroupQuestionId, item.CategoryCode].join('/')
                })}
            >
                {/* <SoftBox mr={1.5} lineHeight={1}>
          <Document />
        </SoftBox> */}
                {item.CategoryName}

                {!hasChildren && (
                    <SoftBadge
                        variant="contained"
                        color={item.IsCommit ? "success" : "error"}
                        size="xs"
                        badgeContent={item.IsCommit ? t("Committed") : t("Uncommit")}
                        container
                        sx={{ ml: 'auto' }}
                    />
                )}

                {hasChildren && (
                    <SoftBox ml='auto' lineHeight={1}>
                        <Icon>{expanded ? 'expand_less' : 'expand_more'}</Icon>
                    </SoftBox>
                )}
            </SoftTypography>

            {hasChildren && (
                <Collapse in={expanded}>
                    <SoftBox ml={3}>
                        {item.children.map((child, index) => <SidenavItem key={index} item={child} component="li" pt={index === 0 ? 0 : 1} />)}
                    </SoftBox>
                </Collapse>
            )}
        </SoftBox >
    );
}

// props type checking
SidenavItem.propTypes = {
    item: PropTypes.object,
}

export default SidenavItem;
