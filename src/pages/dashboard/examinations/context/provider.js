// React components
import { useMemo, useState } from "react";

// React router params
import { useParams } from "react-router-dom";

// Proptypes
import PropTypes from "prop-types";

// Context
import ExaminationsLayoutConfigContext from "./context";

// SoftUI components
import SoftBox from "components/SoftBox";

// Axios
import axios from "axios";

// App components
import HeartRateLoader from "components/HeartRateLoader";

// Lodash helper methods
import clone from "lodash/clone";
import filter from "lodash/filter";
import map from "lodash/map";
import setWith from "lodash/setWith";
import sortBy from "lodash/sortBy";


const ExaminationsLayoutConfigProvider = ({ children }) => {

    const [fetching, setFetching] = useState(true);

    // Get path params
    const { patientId, periodId, doctorAppointmentDtlId, groupQuestionId } = useParams();

    // Initial config values
    const initialValues = {
        details: !Boolean(groupQuestionId),
        sidenav: [],
        patient: {}
    }

    // State config
    const [value, setValue] = useState(initialValues);

    // Load data helpers & methods
    const transformPatientData = fetchedData => fetchedData;
    const transformItemsData = fetchedData => {
        return sortBy(
            map(
                filter(fetchedData, item => !Boolean(item.ParentId)),
                item => ({
                    ...item,
                    children: sortBy(filter(fetchedData, itm => itm.ParentId == item.GroupQuestionId), 'Sequence')
                })
            ),
            'Sequence'
        )
    };
    const loadDataAsync = async () => {
        const [patientResponse, itemsResponse] = await axios.all([
            axios(`/api/PatientPanel/GetPatient?PatientId=${patientId}&DurationId=${periodId}`),
            axios(`/api/QuestionPanel/GetGroupItems?PatientId=${patientId}&DurationId=${periodId}`),
        ]);

        setValue({
            ...value,
            patient: transformPatientData(patientResponse.data),
            sidenav: transformItemsData(itemsResponse.data)
        });

        setFetching(false);
    }

    // Load data whenever fetching is true
    useMemo(() => { loadDataAsync() }, [fetching])


    if (fetching) {
        return (
            <SoftBox minHeight={600} display="flex" alignItems="center">
                <HeartRateLoader />
            </SoftBox>
        )
    }

    return (
        <ExaminationsLayoutConfigContext.Provider
            value={[value, (key, newValue) => setValue(setWith(clone(value), key, newValue, clone))]}
        >
            {children}
        </ExaminationsLayoutConfigContext.Provider>
    )
}

// Props typechecking
ExaminationsLayoutConfigProvider.propTypes = {
    children: PropTypes.node
}

export default ExaminationsLayoutConfigProvider;