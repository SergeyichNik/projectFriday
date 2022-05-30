import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatchActionType} from '../../../bll/reducers/recoveryPassword-reducer';
import {AppRootStateType} from '../../../bll/store/store';

export const useAppDispatch = () => useDispatch<AppDispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector