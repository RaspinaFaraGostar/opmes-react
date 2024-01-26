// React components
import { Fragment, useMemo, useState } from "react";

// Proptyps for typechecking
import PropTypes from "prop-types";

// MUI componenets
import { Box, Checkbox, Collapse, Divider, FormControlLabel, FormGroup, Icon, IconButton, Typography, styled } from "@mui/material";

// SoftUI components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Axios for api calls
import axios from "axios";

// App components
import HeartRateLoader from "components/HeartRateLoader";

// Lodash helper methods
import differenceBy from "lodash/differenceBy";
import filter from "lodash/filter";
import find from "lodash/find";
import flatten from "lodash/flatten";
import includes from "lodash/includes";
import map from "lodash/map";
import some from "lodash/some";

// I18n
import { t } from "i18next";



const ExpansionIcon = styled(Icon, {
    shouldForwardProp: prop => prop != 'expanded'
})(({ theme, expanded }) => ({
    transition: theme.transitions.create('transform'),
    transform: expanded ? "rotate(0deg)" : "rotate(90deg)"
}))



const PermissionSelect = ({ label, value = [], onChange }) => {

    // Data helper methods
    const togglePermission = permission => {
        onChange(
            filter(value, val => val.PermissionId == permission.PermissionId).length > 0 ?
                filter(value, p => p.PermissionId != permission.PermissionId) :
                [...value, permission]
        )
    }

    const toggleAll = () => onChange(valueIncludeAllPermissions ? [] : allPermissions);


    // Permissions fetching state and handlers
    const [permissions, setPermissions] = useState([]);

    const [fetching, setFetchnig] = useState(true);
    const fetchPermissionsAsync = async () => {
        const response = await axios('/api/Permissions/PermissionList');
        setPermissions(response.data);
        setFetchnig(false);
    }

    useMemo(() => {
        fetching && fetchPermissionsAsync();
    }, [fetching])

    // Permissions helper methods
    const allPermissions = flatten(map(permissions, menu => map(menu.Pemissionlist, permission => permission)))
    const valueIncludeAllPermissions = differenceBy(allPermissions, value, "PermissionId").length == 0;

    // // replace ids with permission objects
    // useMemo(() => {
    //     if (some(value, item => typeof item == "string") && permissions.length > 0) {
    //         onChange && onChange(
    //             map(value, item => {
    //                 if (typeof item == "string") {
    //                     return find(allPermissions, permission => permission.PermissionId == item);
    //                 }
    //                 return item;
    //             })
    //         )
    //     }
    // }, [value, permissions])


    // Collapse expansion state and handlers
    const [expanded, setExpanded] = useState([]);
    const toggleMenuExpansion = menuId => setExpanded(
        includes(expanded, menuId) ? filter(expanded, id => id != menuId) : [...expanded, menuId]
    );


    return (
        <div>

            <SoftBox mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight="regular" variant="h6">
                    {label}
                </Typography>


                <FormControlLabel
                    label={t("Select/Deselect all")}
                    sx={{ m: 0 }}
                    control={
                        <Checkbox
                            size="small"
                            checked={valueIncludeAllPermissions}
                            onChange={toggleAll}
                        />
                    }
                />
            </SoftBox>

            {fetching && <HeartRateLoader />}

            {!fetching && (
                <div>
                    {permissions.map((menu) => (
                        <Fragment key={menu.MenuId}>
                            <SoftTypography fontWeight="regular" variant="h6">
                                <IconButton onClick={e => toggleMenuExpansion(menu.MenuId)}>
                                    <ExpansionIcon expanded={includes(expanded, menu.MenuId)}>expand_more</ExpansionIcon>
                                </IconButton>
                                {menu.MenuTitel}
                            </SoftTypography>
                            <Collapse in={includes(expanded, menu.MenuId)}>
                                <Box px={3}>
                                    <FormGroup sx={{ py: 1, flexDirection: "row" }}>
                                        {menu.Pemissionlist.map((permission) => (
                                            <FormControlLabel
                                                key={permission.PermissionId}
                                                label={permission.PermissionTitel}
                                                sx={{ ml: 0 }}
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={filter(value, p => p.PermissionId == permission.PermissionId).length > 0}
                                                        onChange={e => togglePermission(permission)}
                                                    />
                                                }
                                            />
                                        ))}
                                    </FormGroup>
                                </Box>
                            </Collapse>
                            <Divider sx={{ my: 1 }} />
                        </Fragment>
                    ))}
                </div>
            )
            }
        </div >
    )
}


// Typechecking Props
PermissionSelect.propTypes = {
    label: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
}

export default PermissionSelect;