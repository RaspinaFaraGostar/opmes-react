// React components
import { useMemo, useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, useTheme } from "@mui/material";

// SoftUI components
import SoftAlert from "components/SoftAlert";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DialogCloseButton from "components/DialogCloseButton";

// Axios
import axios, { AxiosError } from "axios";

// Formik
import { Formik } from 'formik';

// Component dependencies
import { DatePicker } from "@mui/x-date-pickers";
import InputHelperText from "components/InputHelperText";
import SubUnitSelect from "./components/SubUnitSelect";
import useValidationSchema from "./validation/useValidationSchema";


function PeriodFormDialog({ open, onClose, onSubmitSuccess, initialValues, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // Form initial values
    const getInitialData = () => ({
        DurationId: '',
        Durationumber: '',
        Title: '',
        SubUnitId: null,
        FullDate: null,
        ...(initialValues && {
            ...initialValues,
            FullDate: new Date(initialValues.FullDate)
        })
    });
    const [data, setData] = useState(getInitialData());

    // Set data each time opened base on initial values
    // Set timeout to 195 (theme transition leaving duration) on close for better and smooth UX 
    useMemo(() => setTimeout(() => setData(getInitialData()), open ? 0 : theme.transitions.duration.leavingScreen), [open])

    // Validation schema
    const validationSchema = useValidationSchema();

    // Transform data to post data
    const transform = data => ({
        ...data,
        SubUnitId: data.SubUnitId?.UnitId,
    })

    return (
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
                            method: values.DurationId ? 'PUT' : 'POST',
                            url: values.DurationId ? '/api/DurationPanel/Edit' : '/api/DurationPanel/Create',
                            data: transform(values)
                        })

                        setStatus({ success: true });
                        onSubmitSuccess && onSubmitSuccess(response.data);
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
                <Dialog
                    open={open}
                    onClose={onClose}
                    fullWidth
                    maxWidth="sm"
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit,
                    }}
                >
                    <DialogTitle>{t(values.DurationId ? "Edit period" : "Add period")}</DialogTitle>
                    <DialogCloseButton onClick={onClose} />
                    <DialogContent>
                        <Collapse in={Boolean(errors.submit)}>
                            <SoftAlert color="error">
                                <Typography fontSize="small">{errors.submit}</Typography>
                            </SoftAlert>
                        </Collapse>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <SoftInput
                                    name="Durationumber"
                                    type="text"
                                    placeholder={t("Period Number")}
                                    value={values.Durationumber ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.Durationumber)}
                                />
                                {errors.Durationumber && <InputHelperText color="error">{errors.Durationumber}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SoftInput
                                    name="Title"
                                    type="text"
                                    placeholder={t("Period Name")}
                                    value={values.Title ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.Title)}
                                />
                                {errors.Title && <InputHelperText color="error">{errors.Title}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SubUnitSelect
                                    name="SubUnitId"
                                    value={values.SubUnitId ?? null}
                                    onChange={(event, value) => setFieldValue("SubUnitId", value)}
                                    textFieldProps={{
                                        placeholder: t("Period Subunit"),
                                        error: Boolean(errors.SubUnitId)
                                    }}
                                />
                                {errors.SubUnitId && <InputHelperText color="error">{errors.SubUnitId}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    name="FullDate"
                                    value={values.FullDate ?? null}
                                    onChange={value => setFieldValue("FullDate", value)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            placeholder: t("Period Date"),
                                            error: Boolean(errors.FullDate)
                                        }
                                    }}
                                />
                                {errors.FullDate && <InputHelperText color="error">{errors.FullDate}</InputHelperText>}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <SoftButton type="button" variant="text" color="dark" onClick={onClose}>{t("Cancel")}</SoftButton>
                        <SoftButton type="submit" variant="gradient" color="info" disabled={isSubmitting}>{t("Save")}</SoftButton>
                    </DialogActions>
                </Dialog>
            )}
        </Formik>
    )
}

// Typechecking props
PeriodFormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmitSuccess: PropTypes.func,
    initialValues: PropTypes.object,
};

export default PeriodFormDialog;