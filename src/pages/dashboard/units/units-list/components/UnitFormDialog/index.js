// React components
import { useMemo, useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Typography, useTheme } from "@mui/material";

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
import InputHelperText from "components/InputHelperText";
import useValidationSchema from "./validation/useValidationSchema";
import UnitTypeSelect from "./components/UnitTypeSelect";
import UnitSelect from "./components/UnitSelect";


function RoleFormDialog({ open, onClose, onSubmitSuccess, initialValues, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // Form initial values
    const getInitialData = () => ({
        UnitId: '',
        UnitName: '',
        UnitTypeId: null,
        ParentId: null,
        Address: '',
        Phone: '',
        IsActive: true,
        ...initialValues
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
        ParentId: data.ParentId?.UnitId,
        UnitTypeId: data.UnitTypeId?.EnumId,
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
                    console.log(values);
                    try {
                        const response = await axios({
                            method: values.UnitId ? 'PUT' : 'POST',
                            url: values.UnitId ? '/api/UnitPanel/Edit' : '/api/UnitPanel/Create',
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
                    <DialogTitle>{t(values.UnitId ? "Edit unit" : "Add unit")}</DialogTitle>
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
                                    name="UnitName"
                                    type="text"
                                    placeholder={t("Unit Name")}
                                    value={values.UnitName ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.UnitName)}
                                />
                                {errors.UnitName && <InputHelperText color="error">{errors.UnitName}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <UnitTypeSelect
                                    value={values.UnitTypeId ?? null}
                                    onChange={(event, value) => setFieldValue("UnitTypeId", value)}
                                    textFieldProps={{ placeholder: t("Unit Type") }}
                                />
                                {errors.UnitTypeId && <InputHelperText color="error">{errors.UnitTypeId}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <UnitSelect
                                    name="ParentId"
                                    value={values.ParentId ?? null}
                                    onChange={(event, value) => setFieldValue("ParentId", value)}
                                    textFieldProps={{
                                        placeholder: t("Unit Parent"),
                                        error: Boolean(errors.ParentId)
                                    }}
                                />
                                {errors.ParentId && <InputHelperText color="error">{errors.ParentId}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SoftInput
                                    name="Phone"
                                    type="text"
                                    placeholder={t("Telephone")}
                                    value={values.Phone ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.Phone)}
                                />
                                {errors.Phone && <InputHelperText color="error">{errors.Phone}</InputHelperText>}
                            </Grid>
                            <Grid item xs={2} alignItems="center">
                                <FormControlLabel
                                    sx={{ m: 0 }}
                                    label={t("Active")}
                                    control={
                                        <Checkbox
                                            name="IsActive"
                                            checked={values.IsActive}
                                            onChange={handleChange}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SoftInput
                                    name="Address"
                                    multiline
                                    minRows={3}
                                    placeholder={t("Address")}
                                    value={values.Address ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.Address)}
                                />
                                {errors.Address && <InputHelperText color="error">{errors.Address}</InputHelperText>}
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
RoleFormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmitSuccess: PropTypes.func,
    initialValues: PropTypes.object,
};

export default RoleFormDialog;