// PropTypes
import PropTypes from "prop-types";

// MUI components
import TextField from '@mui/material/TextField';

// Application components
import AsyncSelect from "components/AsyncSelect";

function UnitTypeSelect({ textFieldProps = {}, ...props }) {
    return (
        <AsyncSelect
            url="api/EnumPanel/getByEnumType?EnumType=UnitType"
            getOptionLabel={(option) => option.EnumName}
            isOptionEqualToValue={(option, value) => {
                if (!value) return false;

                if (typeof value === "string")
                    return option.EnumId == value;

                return option.EnumId == value.EnumId;
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

UnitTypeSelect.propTypes = {
    textFieldProps: PropTypes.object,
}

export default UnitTypeSelect;