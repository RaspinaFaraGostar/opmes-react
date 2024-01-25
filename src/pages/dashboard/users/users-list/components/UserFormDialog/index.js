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
import RolesSelect from "./components/RolesSelect";

// Axios
import axios, { AxiosError } from "axios";

// Formik
import { Formik } from 'formik';

// Component dependencies
import InputHelperText from "components/InputHelperText";
import useValidationSchema from "./validation/useValidationSchema";


function UserFormDialog({ open, onClose, onSubmitSuccess, initialValues, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // Form initial values
    const getInitialData = () => ({
        PersonalName: '',
        PersonalLastName: '',
        MedicalNo: '',
        NationalCode: '',
        UserName: '',
        Password: '',
        RePassword: '',
        PostIds: [],
        Lock: false,
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
        PostIds: data.PostIds.map(postId => typeof postId == "string" ? postId : postId?.EnumId)
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
                            method: values.UserId ? 'PUT' : 'POST',
                            url: values.UserId ? '/api/UserPanel/Edit' : '/api/UserPanel/Create',
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
                    <DialogTitle>{t("Add user")}</DialogTitle>
                    <DialogCloseButton onClick={onClose} />
                    <DialogContent>
                        <Collapse in={Boolean(errors.submit)}>
                            <SoftAlert color="error">
                                <Typography fontSize="small">{errors.submit}</Typography>
                            </SoftAlert>
                        </Collapse>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
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
                            <Grid item xs={12} md={4}>
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
                            <Grid item xs={12} md={4} />
                            <Grid item xs={12} md={4}>
                                <SoftInput
                                    name="MedicalNo"
                                    type="number"
                                    placeholder={t("Medical Number")}
                                    value={values.MedicalNo ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.MedicalNo)}
                                />
                                {errors.MedicalNo && <InputHelperText color="error">{errors.MedicalNo}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SoftInput
                                    name="NationalCode"
                                    type="text"
                                    placeholder={t("National Code")}
                                    value={values.NationalCode ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.NationalCode)}
                                />
                                {errors.NationalCode && <InputHelperText color="error">{errors.NationalCode}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={4} />
                            <Grid item xs={12} md={4}>
                                <SoftInput
                                    name="UserName"
                                    type="text"
                                    placeholder={t("Username")}
                                    value={values.UserName ?? ''}
                                    onChange={handleChange}
                                    error={Boolean(errors.UserName)}
                                />
                                {errors.UserName && <InputHelperText color="error">{errors.UserName}</InputHelperText>}
                            </Grid>
                            {!data.UserId && (
                                <>
                                    <Grid item xs={12} md={4}>
                                        <SoftInput
                                            name="Password"
                                            type="password"
                                            placeholder={t("Password")}
                                            value={values.Password ?? ''}
                                            onChange={handleChange}
                                            error={Boolean(errors.Password)}
                                        />
                                        {errors.Password && <InputHelperText color="error">{errors.Password}</InputHelperText>}
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <SoftInput
                                            name="RePassword"
                                            type="password"
                                            placeholder={t("Repeat Password")}
                                            value={values.RePassword ?? ''}
                                            onChange={handleChange}
                                            error={Boolean(errors.RePassword)}
                                        />
                                        {errors.RePassword && <InputHelperText color="error">{errors.RePassword}</InputHelperText>}
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12}>
                                <RolesSelect
                                    value={values.PostIds ?? []}
                                    onChange={(event, value) => setFieldValue("PostIds", value)}
                                    textFieldProps={{ placeholder: t("Roles") }}
                                />
                                {errors.PostIds && <InputHelperText color="error">{errors.PostIds}</InputHelperText>}
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    sx={{ m: 0 }}
                                    label={t("Status")}
                                    control={
                                        <Checkbox
                                            name="IsActive"
                                            checked={values.IsActive}
                                            onChange={handleChange}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    sx={{ m: 0 }}
                                    label={t("Lock Status")}
                                    control={
                                        <Checkbox
                                            name="Lock"
                                            checked={values.Lock}
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
UserFormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmitSuccess: PropTypes.func,
    initialValues: PropTypes.object,
};

export default UserFormDialog;