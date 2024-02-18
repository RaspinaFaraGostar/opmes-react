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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";

// React Router DOM componenets
import { useSearchParams } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftInputLabel from "components/SoftInputLabel";

// I18n
import { useTranslation } from "react-i18next";

function SearchForm() {

    // I18n
    const { t } = useTranslation();

    // Async methods and handlers
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <SoftBox p={3}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={3}>
                    <SoftBox display="block">
                        <SoftInputLabel>{t("Appointment Date")}</SoftInputLabel>
                        <DatePicker
                            name="Date"
                            value={searchParams.has('date') ? new Date(searchParams.get('date')) : null}
                            onChange={value => setSearchParams({
                                ...Object.fromEntries(searchParams),
                                date: new Date(value).toISOString(),
                            })}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    placeholder: t("Appointment Date"),
                                }
                            }}
                        />
                    </SoftBox>
                </Grid>
                <Grid item xs={4} alignItems="center">
                    <SoftInputLabel sx={{ opacity: 0 }}>{t("Appointment is done")}</SoftInputLabel>
                    <FormControlLabel
                        sx={{ m: 0 }}
                        label={t("Appointment is done")}
                        control={
                            <Checkbox
                                name="isCheck"
                                checked={searchParams.has('isCheck') ? searchParams.get('isCheck') == 'true' : null}
                                onChange={event => setSearchParams({
                                    ...Object.fromEntries(searchParams),
                                    isCheck: event.target.checked,
                                })}
                            />
                        }
                    />
                </Grid>
            </Grid>
        </SoftBox>
    )
}

export default SearchForm;