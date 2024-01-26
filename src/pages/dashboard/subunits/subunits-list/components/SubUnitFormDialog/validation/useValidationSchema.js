// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // Subunit Title
        Title: Yup
            .string(t('The field format is invalid', { field: t("Subunit Name") }))
            .required(t('The field is required', { field: t("Subunit Name") })),

        // Subunit Code
        Code: Yup
            .string(t('The field format is invalid', { field: t("Subunit Code") }))
            .required(t('The field is required', { field: t("Subunit Code") })),

    });
}

export default useValidationSchema;