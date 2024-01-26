// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // Unit Name
        UnitName: Yup
            .string(t('The field format is invalid', { field: t("Unit Name") }))
            .required(t('The field is required', { field: t("Unit Name") })),

    });
}

export default useValidationSchema;