// MUI components
import { Skeleton } from "@mui/material";

// Lodash methods
import reduce from "lodash/reduce";
import map from "lodash/map";

const useDataTableLoader = (columns, options = {}) => {

    const _rowsCount = options.rowsCount ?? 5;
    const _skeletonProps = options.skeletonProps ?? { animation: "wave", variant: "text", width: "100px" };

    return map([...Array(_rowsCount)],
        () => reduce(map(columns, col => col.accessor),
            (prev, curr) => ({
                ...prev,
                [curr]: <Skeleton {..._skeletonProps} />
            }),
            {}
        )
    );
}

export default useDataTableLoader;