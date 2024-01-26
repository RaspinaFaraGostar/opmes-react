// PropTypes
import PropTypes from "prop-types";

// MUI components
import TextField from '@mui/material/TextField';

// Application components
import AsyncSelect from "components/AsyncSelect";

function UnitSelect({ textFieldProps = {}, ...props }) {
    return (
        <AsyncSelect
            url="/api/TreePanel/UnitAll"
            getOptionLabel={(option) => option.UnitName ?? ''}
            isOptionEqualToValue={(option, value) => {
                if (!value) return false;

                if (typeof value === "string")
                    return option.UnitId == value;

                return option.UnitId == value.UnitId;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...textFieldProps}
                />
            )}
            {...props}
        />
    );
}

UnitSelect.propTypes = {
    textFieldProps: PropTypes.object,
}

export default UnitSelect;