// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // PersonalName
        PersonalName: Yup
            .string(t('The field format is invalid', { field: t("First Name") }))
            .required(t('The field is required', { field: t("First Name") })),

        // Personal Last Name
        PersonalLastName: Yup
            .string(t('The field format is invalid', { field: t("Last Name") }))
            .required(t('The field is required', { field: t("Last Name") })),


        // Medical Number
        MedicalNo: Yup
            .number(t('The field format is invalid', { field: t("Medical Number") }))
            .required(t('The field is required', { field: t("Medical Number") }))
    });
}

export default useValidationSchema;