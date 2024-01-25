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


function EnumFormDialog({ open, onClose, onSubmitSuccess, initialValues, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // Form initial values
    const getInitialData = () => ({
        EnumCode: '',
        EnumName: '',
        EnumTypeCode: '',
        ImageFileId: '',
        IsTabPage: false,
        ParentName: '',
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
        ...data
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
                        console.log(values);
                        const response = await axios({
                            method: values.EnumId ? 'PUT' : 'POST',
                            url: values.EnumId ? '/api/EnumPanel/Edit' : '/api/EnumPanel/Create',
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
                    maxWidth="xs"
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit,
                    }}
                >
                    <DialogTitle>{t("Add enum")}</DialogTitle>
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
                                    name="EnumName"
                                    type="text"
                                    placeholder={t("Enum Name")}
                                    value={values.EnumName ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.EnumName)}
                                />
                                {errors.EnumName && <InputHelperText color="error">{errors.EnumName}</InputHelperText>}
                            </Grid>
                            <Grid item xs={6} alignItems="center">
                                <FormControlLabel
                                    sx={{ m: 0 }}
                                    label={t("Enum Is Tab Page")}
                                    control={
                                        <Checkbox
                                            name="IsTabPage"
                                            checked={values.IsTabPage}
                                            onChange={handleChange}
                                        />
                                    }
                                />
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
EnumFormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmitSuccess: PropTypes.func,
    initialValues: PropTypes.object,
};

export default EnumFormDialog;