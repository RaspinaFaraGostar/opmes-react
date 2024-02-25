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

// React componenets and hooks
import { useMemo, useState } from "react";

// I18n 
import { useTranslation } from "react-i18next";

// React helmet
import { Helmet } from "react-helmet";

// React router components
import { useParams } from "react-router-dom";

// Form validation schema
import useValidationSchema from "./validation/useValidationSchema";

// Formik
import { Formik } from "formik";

// MUI components
import { Card, CardActions, CardContent, Collapse, Grid, Typography } from "@mui/material";

// SoftUI components
import SoftInput from "components/SoftInput";
import SoftAlert from "components/SoftAlert";
import SoftInputLabel from "components/SoftInputLabel";
import SoftButton from "components/SoftButton";

// App components
import InputHelperText from "components/InputHelperText";

// Query string
import queryString from "query-string";

// Notistack
import { useSnackbar } from "notistack";


function BMIForm() {

    // I18n
    const { t } = useTranslation();

    // Router params
    const params = useParams();

    // Snackbar handlers
    const { enqueueSnackbar } = useSnackbar();

    // Form initial values
    const [data, setData] = useState({});

    // Validation schema
    const validationSchema = useValidationSchema();

    // Get initial Data
    const [initializing, setInitializing] = useState(true);
    const fetchInitialDataAsync = async () => {
        const response = await axios('api/BMIPanel/GetLastBMI?'.concat(
            queryString.stringify({
                PatientId: params.patientId,
                DurationId: params.periodId
            })
        ))
        setData({
            "BMIId": "",
            "Weight": "",
            "DurationId": params.periodId,
            "Height": "",
            "BMI": "",
            "BP": "",
            "PR": "",
            "T": "",
            "PatientId": params.patientId,
            ...response.data
        });
        setInitializing(false);
    }

    // Transform data to post data
    const transform = data => ({
        ...data,
    })

    // Fetch initializing whenevenr intializing state is true
    useMemo(() => { initializing && fetchInitialDataAsync() }, [initializing]);

    if (initializing)
        return null;

    return (
        <>
            <Helmet title={t("BMI")} />

            <Formik
                initialValues={data}
                enableReinitialize
                validationSchema={validationSchema}
                validateOnMount={false}
                validateOnChange={false}
                onSubmit={
                    async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            const response = await axios({
                                method: 'POST',
                                url: '/api/BMIPanel/Create',
                                data: transform(values)
                            })

                            setStatus({ success: true });
                            enqueueSnackbar(response.data, { variant: 'soft', icon: 'check', color: 'success' });
                        } catch (error) {

                            if (error instanceof AxiosError && error.response.status === 409)
                                setErrors({ submit: error.response.data.Message ?? error.message });

                            setStatus({ success: false });

                        } finally {
                            setSubmitting(false);
                        }
                    }
                }
            >
                {({
                    errors,
                    setFieldValue,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                }) => (
                    <Card component='form' onSubmit={handleSubmit}>
                        <CardContent>
                            <Collapse in={Boolean(errors.submit)}>
                                <SoftAlert color="error">
                                    <Typography fontSize="small">{errors.submit}</Typography>
                                </SoftAlert>
                            </Collapse>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={4}>
                                    <SoftInputLabel>{t("Weight")}</SoftInputLabel>
                                    <SoftInput
                                        name="Weight"
                                        type="text"
                                        placeholder={t("Weight")}
                                        value={values.Weight ?? ''}
                                        onChange={handleChange}
                                        error={Boolean(errors.Weight)}
                                    />
                                    {errors.Weight && <InputHelperText color="error">{errors.Weight}</InputHelperText>}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SoftInputLabel>{t("Height")}</SoftInputLabel>
                                    <SoftInput
                                        name="Height"
                                        type="text"
                                        placeholder={t("Height")}
                                        value={values.Height ?? ''}
                                        onChange={handleChange}
                                        error={Boolean(errors.Height)}
                                    />
                                    {errors.Height && <InputHelperText color="error">{errors.Height}</InputHelperText>}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SoftInputLabel>{t("BP")}</SoftInputLabel>
                                    <SoftInput
                                        name="BP"
                                        type="text"
                                        placeholder={t("BP")}
                                        value={values.BP ?? ''}
                                        onChange={handleChange}
                                        error={Boolean(errors.BP)}
                                    />
                                    {errors.BP && <InputHelperText color="error">{errors.BP}</InputHelperText>}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SoftInputLabel>{t("PR")}</SoftInputLabel>
                                    <SoftInput
                                        name="PR"
                                        type="text"
                                        placeholder={t("PR")}
                                        value={values.PR ?? ''}
                                        onChange={handleChange}
                                        error={Boolean(errors.PR)}
                                    />
                                    {errors.PR && <InputHelperText color="error">{errors.PR}</InputHelperText>}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SoftInputLabel>{t("T")}</SoftInputLabel>
                                    <SoftInput
                                        name="T"
                                        type="text"
                                        placeholder={t("T")}
                                        value={values.T ?? ''}
                                        onChange={handleChange}
                                        error={Boolean(errors.T)}
                                    />
                                    {errors.T && <InputHelperText color="error">{errors.T}</InputHelperText>}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SoftInputLabel>{t("BMI")}</SoftInputLabel>
                                    <SoftInput
                                        name="BMI"
                                        type="text"
                                        disabled
                                        placeholder={t("BMI")}
                                        value={values.BMI ?? ''}
                                        onChange={handleChange}
                                        error={Boolean(errors.BMI)}
                                    />
                                    {errors.BMI && <InputHelperText color="error">{errors.BMI}</InputHelperText>}
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            {/* <SoftButton type="button" variant="text" color="dark">{t("Cancel")}</SoftButton> */}
                            <SoftButton type="submit" variant="gradient" color="info" disabled={isSubmitting}>{t("Save")}</SoftButton>
                        </CardActions>
                    </Card>
                )}
            </Formik>
        </>
    )
}

export default BMIForm;