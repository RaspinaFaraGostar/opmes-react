// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = (data) => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // First Name
        PersonalName: Yup
            .string(t('The field format is invalid', { field: t("First Name") }))
            .required(t('The field is required', { field: t("First Name") })),

        // Last Name
        PersonalLastName: Yup
            .string(t('The field format is invalid', { field: t("Last Name") }))
            .required(t('The field is required', { field: t("Last Name") })),
    });
}

export default useValidationSchema;