// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DataTable from "components/DataTable";
import DialogCloseButton from "components/DialogCloseButton";

// Component dependencies
import useTableData from "./data/useTableData";


function UserLogsDialog({ open, onClose, user, ...props }) {

    // I18n
    const { t } = useTranslation();

    // Form initial values
    const { data, total, pageSize, currentPage, changePage } = useTableData({
        userId: user?.UserId
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{t("User login sessions")}</DialogTitle>
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
UserLogsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    user: PropTypes.object,
};

export default UserLogsDialog;