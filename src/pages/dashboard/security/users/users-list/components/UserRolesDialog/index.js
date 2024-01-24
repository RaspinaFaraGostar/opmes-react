// React components
import { useMemo, useState } from "react";

// React Router DOM components
import { useLocation } from "react-router-dom";

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DialogCloseButton from "components/DialogCloseButton";
import DataTable from "examples/Tables/DataTable";

// Axios
import axios from "axios";

// Lodash
import map from "lodash/map";

// QueryString
import queryString from "query-string";



function UserRolesDialog({ open, onClose, user, ...props }) {

    // I18n
    const { t } = useTranslation();

    // Form initial values
    const [data, setData] = useState({ Data: [], Total: 0 });
    const [dataQueryParams, setDataQueryParams] = useState({
        Page: 1,
        PageSize: 25,
        Filter: "",
        Sort: ""
    });

    // React router location
    const fetchUserRolesAsync = async () => {
        const response = await axios('/api/UserRolePanel/GridList?'.concat(
            queryString.stringify({ ...dataQueryParams, UserId: user.UserId })
        ));
        setData(response.data);
    }

    useMemo(() => {
        if (open && user)
            fetchUserRolesAsync();

        if (!open) setData({ Data: [], Total: 0 });
    }, [open, dataQueryParams])

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
                {data.Data.length < 1 && <Box textAlign="center" py={5}>{t("No result")}</Box>}

                {data.Data.length > 0 && (
                    <DataTable
                        table={{
                            columns: [
                                { Header: t("Role Title"), accessor: "RoleTitle" },
                                { Header: t("Unit Name"), accessor: "UnitName" },
                                { Header: t("Action"), accessor: "action", disableSortBy: true },
                            ],

                            rows: map(data.Data, item => ({
                                ...item,
                                // action: <ActionCell {...getActionCellProps(item)} />
                            }))
                        }}
                        entriesPerPage={false}
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