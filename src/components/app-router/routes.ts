import Login from "../../pages/login/Login";
import {
    LOGIN_ROUTE,
    NEW_PASS_ENTER_ROUTE,
    NOT_FOUND_ROUTE,
    PASS_RECOVERY_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    TEST_PAGE_ROUTE
} from "./path-consts";
import PassEnterNew from "../../pages/pass-enter-new/PassEnterNew";
import PassRecovery from "../../pages/pass-recovery/PassRecovery";
import Profile from "../../pages/profile/Profile";
import Registration from "../../pages/registration/Registration";
import TestPage from "../../pages/test-page/TestPage";
import NotFound from "../../pages/not-found/NotFound";

export const routesKit = [
    {
        path: LOGIN_ROUTE,
        element: Login,
        linkName: "Login"
    },
    {
        path: NEW_PASS_ENTER_ROUTE,
        element: PassEnterNew,
        linkName: "New password enter"
    },
    {
        path: PASS_RECOVERY_ROUTE,
        element: PassRecovery,
        linkName: "Password recovery"
    },
    {
        path: PROFILE_ROUTE,
        element: Profile,
        linkName: "Profile"
    },
    {
        path: REGISTRATION_ROUTE,
        element: Registration,
        linkName: "Registration"
    },
    {
        path: TEST_PAGE_ROUTE,
        element: TestPage,
        linkName: "Test page"
    },
    {
        path: NOT_FOUND_ROUTE,
        element: NotFound,
        linkName: "Not found 404"
    },
]


