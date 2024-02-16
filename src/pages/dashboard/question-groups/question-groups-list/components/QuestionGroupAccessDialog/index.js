// React components
import { useMemo, useState } from "react";

// PropTypes
import PropTypes from "prop-types";

// MUI components
import { Box, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, useTheme } from "@mui/material";

// SoftUI Components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// I18n
import { useTranslation } from "react-i18next";

// App components
import DialogCloseButton from "components/DialogCloseButton";

// uidotdev helper hooks
import { useDebounce } from "@uidotdev/usehooks";

// Query string
import queryString from "query-string";

// Lodash helper methods
import filter from "lodash/filter";
import includes from "lodash/includes";



function QuestionGroupAccessDialog({ open, onClose, questionGroup, ...props }) {

    // I18n
    const { t } = useTranslation();

    // MUI theme
    const theme = useTheme();

    // debounced questionGroupId
    // pass debounced data base on open state (dialog transition on close) for better and smooth UX
    const questionGroupId = useDebounce(questionGroup?.GroupQuestionId, open ? 0 : theme.transitions.duration.leavingScreen)

    // FormData
    const [selectedIds, setSelectedIds] = useState([]);
    const handleToggleAccess = id => setSelectedIds(
        includes(selectedIds, id) ? filter(selectedIds, itm => itm != id) : [...selectedIds, id]
    );

    // Data
    const [data, setData] = useState([]);

    // Async methods and handlers
    const [fetching, setFetching] = useState(false);
    const fetchDataAsync = async () => {
        const [listDataResponse, formDataResponse] = await axios.all([
            axios(
                '/api/EnumPanel/getByEnumType?'.concat(
                    queryString.stringify({ EnumType: 'Post' })
                )
            ),
            axios(
                '/api/QuestionGroupPostPanel/GetAccessPostList?'.concat(
                    queryString.stringify({ QuestionGroupId: questionGroupId })
                )
            )
        ])
        setData(listDataResponse.data);
        setSelectedIds(formDataResponse.data);
        setFetching(false);
    }

    useMemo(() => {
        if (questionGroupId) {
            !fetching && setFetching(true);
        } else {
            setData([]);
            setSelectedIds([]);
        }
    }, [questionGroupId]);

    useMemo(() => {
        fetching && fetchDataAsync();
    }, [fetching])


    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{t("Question group access list", { questionGroup: questionGroup?.CategoryName })}</DialogTitle>
            <DialogCloseButton onClick={onClose} />
            <DialogContent>

                {fetching && [...Array(5)].map(n => (
                    <SoftBox pr={2} mb={2} key={n}>
                        <Skeleton variant="text" animation="wave" />
                    </SoftBox>
                ))}

                {!fetching && data.length < 1 && <Box textAlign="center" py={5}>{t("No result")}</Box>}

                {!fetching && data.length > 0 && (
                    <SoftBox>
                        {data.map((row, index) => (
                            <SoftBox pr={2} mb={2} key={index}>
                                <Checkbox
                                    checked={includes(selectedIds, row.EnumId)}
                                    onChange={e => handleToggleAccess(row.EnumId)}
                                />
                                <SoftTypography
                                    variant="button"
                                    fontWeight="medium"
                                >{row.EnumName}</SoftTypography>
                            </SoftBox>
                        ))}
                    </SoftBox>
                )}
            </DialogContent>
            <DialogActions>
                <SoftButton type="button" variant="text" color="dark" onClick={onClose}>{t("Cancel")}</SoftButton>
                <SoftButton type="submit" variant="gradient" color="info">{t("Save")}</SoftButton>
            </DialogActions>
        </Dialog>
    )
}

// Typechecking props
QuestionGroupAccessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    questionGroup: PropTypes.object,
};

export default QuestionGroupAccessDialog;