/* eslint-disable react/prop-types */
// React componenets
import { useMemo, useState } from "react";

// MUI components
import { TextField } from "@mui/material";

// Lodash methods
import reduce from "lodash/reduce";
import map from "lodash/map";
import filter from "lodash/filter";

// React router dom components
import { useSearchParams } from "react-router-dom";

// uidotdev hooks
import { useDebounce } from "@uidotdev/usehooks";


// Helper methods
const getFilterObject = (columns, callback) => {
    return reduce(columns,
        (prev, curr) => ({
            ...prev,
            [curr.accessor]: callback(curr)
        }),
        {}
    );
}

const cleanFilterQueryParam = value => {
    if (filter(value.Filters, _filter => Boolean(_filter.Value)).length < 1) return '';
    return { ...value, Filters: filter(value.Filters, _filter => Boolean(_filter.Value)) }
}

const FilterComponent = ({ column, ...props }) => {

    // React router search params
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters data object
    const [value, setValue] = useState('');

    // get debounced data
    const debouncedValue = useDebounce(value, 1000);

    const getQueryParamFilter = () => {
        const queryFilter = Boolean(searchParams.get('Filter')) ? JSON.parse(searchParams.get('Filter')) : {
            Field: null,
            Logic: "and",
            Operator: "startswith",
            Value: null,
            Filters: []
        };

        if (filter(queryFilter.Filters, filter => filter.Field == column.accessor).length > 0) {
            return cleanFilterQueryParam({
                ...queryFilter,
                Filters: map(queryFilter.Filters, filter => filter.Field == column.accessor ? ({
                    ...filter,
                    Value: value
                }) : filter)
            })
        }

        return cleanFilterQueryParam({
            ...queryFilter,
            Filters: [
                ...(queryFilter.Filters ?? []), {
                    Field: column.accessor,
                    Logic: "and",
                    Operator: "startswith",
                    Value: value,
                }
            ]
        })
    }

    useMemo(() => {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            Filter: JSON.stringify(getQueryParamFilter())
        })
    }, [debouncedValue]);

    return (
        <TextField
            fullWidth
            margin="none"
            size="small"
            value={value}
            onChange={e => setValue(e.target.value)}
            {...props}
        />
    )
}

const useTableFilter = (columns) => {
    return getFilterObject(columns, col => !col.noFilter && (
        <FilterComponent
            column={col}
        />
    ));
}

export default useTableFilter;