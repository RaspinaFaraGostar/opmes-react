import UsersList from "pages/dashboard/users/users-list";
import EnumsList from "pages/dashboard/enums/enums-list";

const dynamicRoutes = [
    {
        route: "/panel/security/user",
        component: <UsersList />
    },


    // Enums routes
    {
        route: "/panel/baseInfo/enum/City",
        component: <EnumsList type="City" />
    },
    {
        route: "/panel/baseInfo/enum/Hospital",
        component: <EnumsList type="Hospital" />
    },
    {
        route: "/panel/baseInfo/enum/Education",
        component: <EnumsList type="Education" />
    },
    {
        route: "/panel/baseInfo/enum/Speciality",
        component: <EnumsList type="Speciality" />
    },
    {
        route: "/panel/baseInfo/enum/MedicineTitle",
        component: <EnumsList type="MedicineTitle" />
    },


    {
        route: "/panel/baseInfo/enum/UnitType",
        component: <EnumsList type="UnitType" />
    },
    {
        route: "/panel/baseInfo/enum/Post",
        component: <EnumsList type="Post" />
    },
]
export default dynamicRoutes;