// React components
import { useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Typography } from "@mui/material";

// SoftUI components
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DialogCloseButton from "components/DialogCloseButton";

// Axios
import axios from "axios";

// Formik and Yup
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useIsFirstRender } from "@uidotdev/usehooks";
import RolesSelect from "./components/RolesSelect";


function UserFormDialog({ open, onClose, initialValues = {}, ...props }) {

    // I18n
    const { t } = useTranslation();

    // Check if is frist render
    const isFirstRender = useIsFirstRender();

    return (
        <Formik
            initialValues={{
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
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
                PersonalName: Yup.string()
                    .required(t('The email field is required')),
                PersonalLastName: Yup.string()
                    .required(t('The password field is required')),
                MedicalNo: Yup.number().required(t('The password field is required'))
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: '/api/UserPanel/Create'
                    })

                    console.log(response);

                    if (!isFirstRender) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err) {
                    console.error(err);

                    if (!isFirstRender) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({
                errors,
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
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <SoftInput
                                    name="PersonalName"
                                    type="text"
                                    placeholder={t("First Name")}
                                    value={values.PersonalName}
                                    onChange={handleChange}
                                    error={Boolean(errors.PersonalName)}
                                />
                                {errors.PersonalName && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.PersonalName}</Typography>}
                            </Grid>
                            <Grid item xs={4}>
                                <SoftInput
                                    name="PersonalLastName"
                                    type="text"
                                    placeholder={t("Last Name")}
                                    value={values.PersonalLastName}
                                    onChange={handleChange}
                                    error={Boolean(errors.PersonalLastName)}
                                />
                                {errors.PersonalLastName && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.PersonalLastName}</Typography>}
                            </Grid>
                            <Grid item xs={4}>
                                <SoftInput
                                    name="MedicalNo"
                                    type="number"
                                    placeholder={t("Medical Number")}
                                    value={values.MedicalNo}
                                    onChange={handleChange}
                                    error={Boolean(errors.MedicalNo)}
                                />
                                {errors.MedicalNo && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.MedicalNo}</Typography>}
                            </Grid>
                            <Grid item xs={4}>
                                <SoftInput
                                    name="UserName"
                                    type="text"
                                    placeholder={t("Username")}
                                    value={values.UserName}
                                    onChange={handleChange}
                                    error={Boolean(errors.UserName)}
                                />
                                {errors.UserName && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.UserName}</Typography>}
                            </Grid>
                            <Grid item xs={4}>
                                <SoftInput
                                    name="NationalCode"
                                    type="text"
                                    placeholder={t("National Code")}
                                    value={values.NationalCode}
                                    onChange={handleChange}
                                    error={Boolean(errors.NationalCode)}
                                />
                                {errors.NationalCode && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.NationalCode}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                {/* <SoftInput placeholder={} /> */}
                                <RolesSelect 
                                    value={values.PostIds}
                                    onChange={handleChange}
                                    textFieldProps={{ placeholder: t("Roles") }} 
                                />
                                {errors.PostIds && <Typography color="error" variant="caption" sx={{ ml: 1 }}>{errors.PostIds}</Typography>}
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
                        <SoftButton type="submit" variant="gradient" color="info">{t("Save")}</SoftButton>
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
    initialValues: PropTypes.object,
};

export default UserFormDialog;