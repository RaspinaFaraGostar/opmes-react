// React components
import { useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Box, Dialog, DialogContent, DialogTitle, Stack, useTheme } from "@mui/material";

// SoftUI components
import SoftButton from "components/SoftButton";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DataTable from "components/DataTable";
import DialogCloseButton from "components/DialogCloseButton";

// Axios
import axios, { AxiosError } from "axios";

// Sweetalert2
import Swal from "sweetalert2";

// Component dependencies
import useTableData from "./data/useTableData";

// Snackbar
import { useSnackbar } from "notistack";

// uidotdev helper hooks
import { useDebounce } from "@uidotdev/usehooks";
import UserAssignRoleFormDialog from "./components/UserAssignRoleFormDialog";



function UserRolesDialog({ open, onClose, user, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // Snackbar handlers
    const { enqueueSnackbar } = useSnackbar();

    // debounced userId
    // pass debounced data base on open state (dialog transition on close) for better and smooth UX
    const userId = useDebounce(user?.UserId, open ? 0 : theme.transitions.duration.leavingScreen);

    // Form dialog props and handlers
    const [formDialogProps, setFormDialogProps] = useState({ open: false });

    // Form initial values
    const { data, total, currentPage, pageSize, refetch, changePage } = useTableData({
        userId,
        getRowActionCellProps: row => ({
            onClick: async (event, action) => {
                switch (action) {
                    case 'delete':
                        const newSwal = Swal.mixin({
                            customClass: {
                                confirmButton: "button button-error",
                                cancelButton: "button button-text",
                            },
                            buttonsStyling: false,
                        });

                        const result = await newSwal.fire({
                            title: t("Are you sure?"),
                            text: t("You won't be able to revert this!"),
                            showCancelButton: true,
                            confirmButtonText: t("Confirm delete"),
                            cancelButtonText: t("Cancel"),
                            reverseButtons: true,
                        });

                        if (result.value) {
                            try {
                                const response = await axios({
                                    method: 'DELETE',
                                    url: '/api/UserRolePanel/'.concat(row.UserRoleId),
                                    data: row
                                })

                                enqueueSnackbar(response.data, { variant: 'soft', icon: 'check', color: 'success' });
                                refetch();
                            } catch (error) {
                                if (error instanceof AxiosError) {
                                    if (error.response.status == 409) {
                                        enqueueSnackbar(error.response.data.Message, { variant: 'soft', icon: 'close', color: 'error' });
                                    }
                                }
                            }

                        }

                        return;
                }
            }
        })
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{t("User roles")}</DialogTitle>
            <DialogCloseButton onClick={onClose} />
            <DialogContent>
                <Stack spacing={1} direction="row">
                    <SoftButton
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => setFormDialogProps({ open: true, initialValues: { UserId: userId } })}
                    >
                        + {t("Assign role")}
                    </SoftButton>
                </Stack>

                {data.rows.length < 1 && <Box textAlign="center" py={5}>{t("No result")}</Box>}

                {data.rows.length > 0 && (
                    <DataTable
                        table={data}
                        totalCount={total}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={changePage}
                    />
                )}
            </DialogContent>

            <UserAssignRoleFormDialog
                {...formDialogProps}
                onClose={() => setFormDialogProps({ open: false })}
                onSubmitSuccess={response => {
                    enqueueSnackbar(response, { variant: 'soft', icon: 'check', color: 'success' });
                    setFormDialogProps({ open: false })
                    refetch();
                }}
            />
        </Dialog>
    )
}

// Typechecking props
UserRolesDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

export default UserRolesDialog;