import {combineReducers} from 'redux';
import appointment from './appointment/reducer';
import user from './user/reducer';
import business from './business/reducer';
import external from './external/reducer';
import category from './category/reducer';
import subCategory from './subCategory/reducer';
import modals from './modals/reducer';

export default combineReducers(
    {
        appointment,
        user,
        business,
        external,
        category,
        subCategory,
        modals
    }
);