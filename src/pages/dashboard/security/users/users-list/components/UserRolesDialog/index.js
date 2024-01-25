// React components

// React Router DOM components

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

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



function UserRolesDialog({ open, onClose, user, ...props }) {

    // I18n
    const { t } = useTranslation();

    // Snackbar handlers
    const { enqueueSnackbar } = useSnackbar();

    // Form initial values
    const { data, total, currentPage, pageSize, refetch, changePage } = useTableData({
        userId: user?.UserId,
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