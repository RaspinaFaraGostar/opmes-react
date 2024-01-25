// React components
import { useMemo, useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, useTheme } from "@mui/material";

// SoftUI components
import SoftAlert from "components/SoftAlert";
import SoftButton from "components/SoftButton";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DialogCloseButton from "components/DialogCloseButton";
import InputHelperText from "components/InputHelperText";

// Axios
import axios, { AxiosError } from "axios";

// Formik
import { Formik } from 'formik';

// Lodash methods
import pick from "lodash/pick";

// Component dependencies
import RoleSelect from "./components/RoleSelect";
import UnitSelect from "./components/UnitSelect";
import useValidationSchema from "./validation/useValidationSchema";


function UserAssignRoleFormDialog({ open, onClose, onSubmitSuccess, initialValues, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // Form initial values
    const getInitialData = () => ({
        RoleId: null,
        UnitId: null,
        UserId: '',
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
        ...(pick(data, 'UserId')),
        RoleId: data.RoleId?.RoleId,
        UnitId: data.UnitId?.UnitId,
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
                            method: 'POST',
                            url: '/api/UserRolePanel/Create',
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
                                <UnitSelect
                                    name="UnitId"
                                    value={values.UnitId ?? null}
                                    onChange={(event, value) => setFieldValue("UnitId", value)}
                                    textFieldProps={{
                                        placeholder: t("Unit"),
                                        error: Boolean(errors.UnitId)
                                    }}
                                />
                                {errors.UnitId && <InputHelperText color="error">{errors.UnitId}</InputHelperText>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RoleSelect
                                    name="RoleId"
                                    placeholder={t("Role")}
                                    value={values.RoleId ?? null}
                                    onChange={(event, value) => setFieldValue("RoleId", value)}
                                    textFieldProps={{
                                        placeholder: t("Role"),
                                        error: Boolean(errors.RoleId)
                                    }}
                                />
                                {errors.RoleId && <InputHelperText color="error">{errors.RoleId}</InputHelperText>}
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
UserAssignRoleFormDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmitSuccess: PropTypes.func,
    initialValues: PropTypes.object,
};

export default UserAssignRoleFormDialog;