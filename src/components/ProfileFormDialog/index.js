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
import InputHelperText from "components/InputHelperText";

// Axios
import axios, { AxiosError } from "axios";

// Formik
import { Formik } from 'formik';

// Component dependencies
import useValidationSchema from "./validation/useValidationSchema";


function ProfileFormDialog({ open, onClose, onSubmitSuccess, initialValues, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // Form initial values
    const getInitialData = () => ({
        PersonalName: '',
        PersonalLastName: '',
        ...initialValues
    });
    const [data, setData] = useState(getInitialData());

    // Set data each time opened base on initial values
    // Set timeout to 195 (theme transition leaving duration) on close for better and smooth UX 
    useMemo(() => setTimeout(() => setData(getInitialData()), open ? 0 : theme.transitions.duration.leavingScreen), [open])

    // Validation schema
    const validationSchema = useValidationSchema(data);

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
                        const response = await axios({
                            method: 'PUT',
                            url: '/api/UserPanel/EditUserProfile',
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
                    <DialogTitle>{t("Assign new role")}</DialogTitle>
                    <DialogCloseButton onClick={onClose} />
                    <DialogContent>
                        <Collapse in={Boolean(errors.submit)}>
                            <SoftAlert color="error">
                                <Typography fontSize="small">{errors.submit}</Typography>
                            </SoftAlert>
                        </Collapse>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <SoftInput
                                    name="PersonalName"
                                    type="text"
                                    placeholder={t("First Name")}
                                    value={values.PersonalName ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.PersonalName)}
                                />
                                {errors.PersonalName && <InputHelperText color="error">{errors.PersonalName}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SoftInput
                                    name="PersonalLastName"
                                    type="text"
                                    placeholder={t("Last Name")}
                                    value={values.PersonalLastName ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.PersonalLastName)}
                                />
                                {errors.PersonalLastName && <InputHelperText color="error">{errors.PersonalLastName}</InputHelperText>}
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
ProfileFormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmitSuccess: PropTypes.func,
    initialValues: PropTypes.object,
};

export default ProfileFormDialog;