// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // EnumName
        // EnumName: Yup
        //     .string(t('The field format is invalid', { field: t("Enum Name") }))
        //     .required(t('The field is required', { field: t("Enum Name") })),

        // IsTabPage
        // IsTabPage: Yup
        //     .number(t('The field format is invalid', { field: t("Enum Is Tab Page") }))
        //     .required(t('The field is required', { field: t("Enum Is Tab Page") }))
    });
}

export default useValidationSchema;