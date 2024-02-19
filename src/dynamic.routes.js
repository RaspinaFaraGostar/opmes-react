import UsersList from "pages/dashboard/users/users-list";
import RolesList from "pages/dashboard/roles/roles-list";
import EnumsList from "pages/dashboard/enums/enums-list";
import UnitsList from "pages/dashboard/units/units-list";
import SubUnitsList from "pages/dashboard/subunits/subunits-list";
import PeriodsList from "pages/dashboard/periods/periods-list";
import QuestionGroupsList from "pages/dashboard/question-groups/question-groups-list";
import QuestionsList from "pages/dashboard/questions/questions-list";
import AnswerTemplatesList from "pages/dashboard/answer-templates/answer-templates-list";
import PatientsList from "pages/dashboard/patients/patients-list";
import PatientReportsList from "pages/dashboard/patient-reports/patient-reports-list";
import DoctorAppointmentsList from "pages/dashboard/doctor-appointments/doctor-appointments-list";
import Examinations from "pages/dashboard/examinations";

const dynamicRoutes = [
    {
        protected: true,
        route: "/panel/security/user",
        component: <UsersList />
    },
    {
        protected: true,
        route: "/panel/security/role",
        component: <RolesList />
    },



    // Enums routes
    {
        protected: true,
        route: "/panel/baseInfo/enum/City",
        component: <EnumsList type="City" />
    },
    {
        protected: true,
        route: "/panel/baseInfo/enum/Hospital",
        component: <EnumsList type="Hospital" />
    },
    {
        protected: true,
        route: "/panel/baseInfo/enum/Education",
        component: <EnumsList type="Education" />
    },
    {
        protected: true,
        route: "/panel/baseInfo/enum/Speciality",
        component: <EnumsList type="Speciality" />
    },
    {
        protected: true,
        route: "/panel/baseInfo/enum/MedicineTitle",
        component: <EnumsList type="MedicineTitle" />
    },

    {
        protected: true,
        route: "/panel/baseInfo/enum/Category",
        component: <EnumsList type="Category" />
    },

    {
        protected: true,
        route: "/panel/baseInfo/enum/QuestionType",
        component: <EnumsList type="QuestionType" />
    },


    {
        protected: true,
        route: "/panel/baseInfo/enum/UnitType",
        component: <EnumsList type="UnitType" />
    },
    {
        protected: true,
        route: "/panel/baseInfo/enum/Post",
        component: <EnumsList type="Post" />
    },


    {
        protected: true,
        route: "/panel/baseInfo/unit",
        component: <UnitsList />
    },
    {
        protected: true,
        route: "/panel/baseInfo/subunit",
        component: <SubUnitsList />
    },
    {
        protected: true,
        route: "/panel/baseInfo/duration",
        component: <PeriodsList />
    },


    {
        protected: true,
        route: "/panel/enginQuestion/question",
        component: <QuestionGroupsList />
    },
    {
        protected: true,
        route: "/panel/enginQuestion/create-question/:questionGroupId/:questionGroupName",
        component: <QuestionsList />
    },
    {
        protected: true,
        route: "/panel/baseInfo/templateAnswer",
        component: <AnswerTemplatesList />
    },


    {
        protected: true,
        route: "/panel/HealthMedicine/patient",
        component: <PatientsList />
    },

    {
        protected: true,
        route: "/panel/report/patient-rep",
        component: <PatientReportsList />
    },

    {
        protected: true,
        route: "/panel/HealthMedicine/doctorVisit",
        component: <DoctorAppointmentsList />
    },

    {
        protected: true,
        route: "/panel/HealthMedicine/HealthMedicinePage/:patientId/:periodId/:doctorAppointmentDtlId/:trunDate/:isCheck",
        component: <Examinations />
    },
]
export default dynamicRoutes;