// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // Period Title
        Title: Yup
            .string(t('The field format is invalid', { field: t("Period Name") }))
            .required(t('The field is required', { field: t("Period Name") })),

        // Period Code
        Durationumber: Yup
            .number(t('The field format is invalid', { field: t("Period Number") }))
            .required(t('The field is required', { field: t("Period Number") })),

    });
}

export default useValidationSchema;