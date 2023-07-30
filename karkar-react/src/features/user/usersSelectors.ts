import { SystemState } from './usersTypes';

export const getUserValue = (state: SystemState) => state.user.value;
export const getUserToken = (state: SystemState) => state.user.token;