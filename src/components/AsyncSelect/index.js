// React components and hooks
import { useState, useEffect, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// Proptypes
import PropTypes from "prop-types";

// Axios
import axios from 'axios';

function AsyncSelect({ url, ...props }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await axios(url);

            if (active) {
                setOptions(response.data);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            {...props}
        // isOptionEqualToValue={(option, value) => option.title === value.title}
        // getOptionLabel={(option) => option.title}
        // renderInput={(params) => (
        //     <TextField
        //         {...params}
        //         label="Asynchronous"
        //         InputProps={{
        //             ...params.InputProps,
        //             endAdornment: (
        //                 <Fragment>
        //                     {loading ? <CircularProgress color="inherit" size={20} /> : null}
        //                     {params.InputProps.endAdornment}
        //                 </Fragment>
        //             ),
        //         }}
        //     />
        // )}
        />
    );
}

AsyncSelect.propTypes = {
    url: PropTypes.string.isRequired,
}

export default AsyncSelect;