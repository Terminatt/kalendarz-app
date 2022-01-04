import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

const useLogged = (): boolean => {
    const user = useSelector((state: RootState) => state.user.data);

    return !!user;
};

export default useLogged;
