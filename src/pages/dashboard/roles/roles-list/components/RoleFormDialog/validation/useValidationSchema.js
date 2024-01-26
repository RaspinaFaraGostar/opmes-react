// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // Role Name
        RoleName: Yup
            .string(t('The field format is invalid', { field: t("Role Name") }))
            .required(t('The field is required', { field: t("Role Name") })),

        // Role Code
        RoleCode: Yup
            .string(t('The field format is invalid', { field: t("Role Code") }))
            .required(t('The field is required', { field: t("Role Code") })),

    });
}

export default useValidationSchema;