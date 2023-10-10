import { clearAuthenticatedUser } from '../../utils/auths';
import Navigate from '../Router/Navigate';

const Logout = () => {
  clearAuthenticatedUser();
  Navigate('/');
};

export default Logout;