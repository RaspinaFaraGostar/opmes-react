// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = () => {

    const { t } = useTranslation();

    return Yup.object().shape({

        // RoleName
        RoleName: Yup
            .string()
            .required(t('The field is required', { field: t("Role Name") })),

        // Personal Last Name
        RoleCode: Yup
            .string()
            .required(t('The field is required', { field: t("Role Code") })),


        // Medical Number
        PermissionIds: Yup
            .array(t('The field must be array', { field: t("Role Permissions") }))
            .required(t('The field is required', { field: t("Role Permissions") }))
    });
}

export default useValidationSchema;