// PropTypes
import PropTypes from "prop-types";

// MUI components
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Fragment } from "react";
import { CircularProgress } from "@mui/material";

// Application components
import AsyncSelect from "components/AsyncSelect";

// Icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


// Icons components
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function RolesSelect({ textFieldProps = {}, ...props }) {
    return (
        <AsyncSelect
            url="api/EnumPanel/getByEnumType?EnumType=Post"
            multiple
            disableCloseOnSelect
            getOptionLabel={(option) => option.EnumName}
            isOptionEqualToValue={(option, value) => {
                if (!value) return false;

                if (typeof value === "string")
                    return option.EnumId == value;

                return option.EnumId == value.EnumId;
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props} key={option.EnumId}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.EnumName}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...textFieldProps}
                // InputProps={{
                //     ...params.InputProps,
                //     endAdornment: (
                //         <Fragment>
                //             {loading ? <CircularProgress color="inherit" size={20} /> : null}
                //             {params.InputProps.endAdornment}
                //         </Fragment>
                //     ),
                // }}
                />
            )}
            {...props}
        />
    );
}

RolesSelect.propTypes = {
    textFieldProps: PropTypes.object,
}

export default RolesSelect;