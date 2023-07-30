import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { users } from "../../services";
import { LoginResponse, UserRequest, User, Token } from "../../types";
import { addUserAction, setTokenAction } from "./usersActions";
import { GenericAction } from "./usersTypes";

export const fetchUserThunk = (
    email: string,
    password: string
): ThunkAction<void, RootState, unknown, GenericAction> => async (dispatch) => {
    try {
        const userRequest: UserRequest = {
            email: email,
            senha: password
        }
        const response: LoginResponse = await users.login(userRequest)
        let user: User = {
            email: userRequest.email,
            password: null,
            id: null,
            userRoles: null
        }
        let tokenInfo: Token = {
            token: response.token,
            expiration: response.expiration,
            roles: response.roles
        }
        localStorage.setItem('token', JSON.stringify(tokenInfo))
        dispatch(addUserAction(user))
        dispatch(setTokenAction(tokenInfo))
    } catch (error) {
        console.error(error)
    }
}