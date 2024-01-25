// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = (data) => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // Unit
        UnitId: Yup
            .mixed()
            .required(t('The field is required', { field: t("Unit") })),

        // Role
        RoleId: Yup
            .mixed()
            .required(t('The field is required', { field: t("Role") })),
    });
}

export default useValidationSchema;