import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

const useLogged = (): boolean => {
    const user = useSelector((state: RootState) => state.user.currentUser);

    return !!user;
};

export default useLogged;
