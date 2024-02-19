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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// I18n
import { useTranslation } from "react-i18next";

// Date-fns
import format from "date-fns-jalali/format";
import SoftButton from "components/SoftButton";

function Header() {

  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);
  const handleSetVisible = () => setVisible(!visible);

  const DEMO = {
    "PatientId": "60a5fe45-821b-40d8-8b8d-1236d900bc3d",
    "Name": "ناصر",
    "Family": "الهی",
    "FatherName": "حمداله",
    "GenderName": "مذکر",
    "NationalId": "2992565466",
    "PersonelId": "823671",
    "Birthday": "1974-07-20T00:00:00",
    "CityName": "کرمان",
    "EducationName": "لیسانس",
    "MarriedName": "کرمان",
    "Children": 3,
    "LifeCityName": "متاهل",
    "Address": "",
    "Tel": "",
    "Mobile": "09134417251",
    "SubUnitName": "شرکت ملی صنایع مس ایران",
    "DurationName": "دوره اول",
    "Created": "0001-01-01T00:00:00"
  };

  const defs = [
    {
      label: t("Patient Name"),
      accessor: 'Name'
    },
    {
      label: t("Patient Last Name"),
      accessor: 'Family'
    },
    {
      label: t("Patient Father Name"),
      accessor: 'FatherName'
    },
    {
      label: t("Patient Gender"),
      accessor: 'GenderName'
    },
    {
      label: t("Patient Personel ID"),
      accessor: 'PersonelId'
    },
    {
      label: t("Patient National ID"),
      accessor: 'NationalId'
    },
    {
      label: t("Patient Birthday"),
      accessor: 'Birthday',
      formatValue: value => typeof value == "string" && format(new Date(value), "yyyy/MM/dd")
    },
    {
      label: t("Patient Born Location"),
      accessor: 'LifeCityName'
    },
    {
      label: t("Patient Education"),
      accessor: 'EducationName'
    },
    {
      label: t("Patient Marital Status"),
      accessor: 'MarriedName'
    },
    {
      label: t("Patient Children Count"),
      accessor: 'Children'
    },
    {
      label: t("Patient City"),
      accessor: 'CityName'
    },
    {
      label: t("Patient Address"),
      accessor: 'Address'
    },
    {
      label: t("Patient Tel"),
      accessor: 'Tel'
    },
    {
      label: t("Patient SubUnit"),
      accessor: 'SubUnitName'
    },
    {
      label: t("Patient Mobile"),
      accessor: 'Mobile'
    },
  ]

  return (
    <Card id="profile">
      <SoftBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              alt="profile-image"
              variant="rounded"
              size="xl"
              bgColor="light"
            // shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {DEMO["Name"] + ' ' + DEMO['Family']}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {DEMO['NationalId'] || DEMO['PersonelId']}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item sx={{ ml: "auto" }}>
            <SoftBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
              sx={{ cursor: 'pointer' }}
              onClick={handleSetVisible}
            >
              <SoftTypography variant="caption" fontWeight="medium">
                {t("Expand patient details")}
              </SoftTypography>
              <Icon sx={{ mx: 1 }}>{visible ? 'expand_less' : 'expand_more'}</Icon>
            </SoftBox>
          </Grid>
        </Grid>

        <Collapse in={visible}>
          <div>
            <Divider />
            <Grid container>
              {defs.map((def, index) => (
                <Grid key={def.id || def.accessor || index} item xs={12} md={4} xl={3}>
                  <SoftBox display="flex" py={1} pr={2}>
                    <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      {def.label}: &nbsp;
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{typeof def.formatValue == "function" ? def.formatValue(DEMO[def.accessor]) : DEMO[def.accessor]}
                    </SoftTypography>
                  </SoftBox>
                </Grid>
              ))}
            </Grid>
          </div>
        </Collapse>
      </SoftBox>
    </Card>
  );
}

export default Header;
