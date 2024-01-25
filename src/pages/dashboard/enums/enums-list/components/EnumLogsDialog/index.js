// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Box, Dialog, DialogContent, DialogTitle, useTheme } from "@mui/material";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DataTable from "components/DataTable";
import DialogCloseButton from "components/DialogCloseButton";

// Component dependencies
import useTableData from "./data/useTableData";

// uidotdev helper hooks
import { useDebounce } from "@uidotdev/usehooks";


function EnumLogsDialog({ open, onClose, enumEntity, enumType, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // debounced enumId
    // pass debounced data base on open state (dialog transition on close) for better and smooth UX
    const enumId = useDebounce(enumEntity?.EnumId, open ? 0 : theme.transitions.duration.leavingScreen)

    // Form initial values
    const { data, total, pageSize, currentPage, changePage } = useTableData({ enumId, enumType });

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
EnumLogsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    enumEntity: PropTypes.object,
    enumType: PropTypes.string,
};

export default EnumLogsDialog;