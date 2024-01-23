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

function RolesSelect() {
    return (
        <AsyncSelect
            url="api/EnumPanel/getByEnumType?EnumType=Post"
            multiple
            // options={top100Films}
            // disableCloseOnSelect
            getOptionLabel={(option) => option.EnumName}
            isOptionEqualToValue={(option, value) => value && option.EnumId === value.EnumId}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
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
                    placeholder="Favorites"
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
        />
    );
}

RolesSelect.propTypes = {

}

export default RolesSelect;