import { RootState } from '@store/index';
import { Group } from '@store/user/types';
import { useSelector } from 'react-redux';

const useAdmin = (): boolean => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    return currentUser?.groups === Group.ADMIN;
};

export default useAdmin;
