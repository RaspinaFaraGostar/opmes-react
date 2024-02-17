// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // Template Title
        Title: Yup
            .string(t('The field format is invalid', { field: t("Template Title") }))
            .required(t('The field is required', { field: t("Template Title") })),

    });
}

export default useValidationSchema;