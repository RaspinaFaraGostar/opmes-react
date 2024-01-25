// Yup
import * as Yup from 'yup';

// I18n
import { useTranslation } from 'react-i18next';

const useValidationSchema = (data) => {

    const { t } = useTranslation();

    return Yup.object().shape({

        ...(!data.UserId && {

            // BackPassword
            BackPassword: Yup
                .string()
                .required(t('The field is required', { field: t("Old Password") })),
        }),

        // Password
        Password: Yup
            .string()
            .required(t('The field is required', { field: t("New Password") })),

        // RePassword
        RePassword: Yup
            .string()
            .required(t('The field is required', { field: t("Repeat New Password") })),
    });
}

export default useValidationSchema;