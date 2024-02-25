// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // Weight
        Weight: Yup
            .number(t('The field format is invalid', { field: t("Weight") }))
            .required(t('The field is required', { field: t("Weight") })),

        // Height
        Height: Yup
            .number(t('The field format is invalid', { field: t("Height") }))
            .required(t('The field is required', { field: t("Height") })),

        // BP
        BP: Yup
            .number(t('The field format is invalid', { field: t("BP") }))
            .required(t('The field is required', { field: t("BP") })),

        // PR
        PR: Yup
            .number(t('The field format is invalid', { field: t("PR") }))
            .required(t('The field is required', { field: t("PR") })),

        // T
        T: Yup
            .number(t('The field format is invalid', { field: t("T") }))
            .required(t('The field is required', { field: t("T") })),

    });
}

export default useValidationSchema;