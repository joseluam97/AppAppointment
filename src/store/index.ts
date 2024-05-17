import {combineReducers} from 'redux';
import appointment from './appointment/reducer';
import user from './user/reducer';
import business from './business/reducer';
import external from './external/reducer';

export default combineReducers(
    {
        appointment,
        user,
        business,
        external
    }
);