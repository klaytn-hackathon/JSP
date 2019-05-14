import { cav } from '../../klaytn/caver';
import {
  LOGIN,
  LOGOUT,
  INTEGRATE_WALLET,
  REMOVE_WALLET,
} from './actionTypes';

export const integrateWallet = privateKey => (dispatch) => {
  const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey);

  cav.klay.accounts.wallet.add(walletInstance);

  // eslint-disable-next-line no-undef
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance));

  // To access walletInstance information throughout the whole application, save it to redux store
  return dispatch({
    type: INTEGRATE_WALLET,
    payload: {
      privateKey,
      address: walletInstance.address,
    },
  });
};

// 2. Remove wallet
export const removeWallet = () => (dispatch) => {
  cav.klay.accounts.wallet.clear();
  // eslint-disable-next-line no-undef
  sessionStorage.removeItem('walletInstance');
  return dispatch({
    type: REMOVE_WALLET,
  });
};

export const login = privateKey => (dispatch) => {
  dispatch(integrateWallet(privateKey));
  return dispatch({
    type: LOGIN,
  });
};

export const logout = () => (dispatch) => {
  dispatch(removeWallet());
  return dispatch({
    type: LOGOUT,
  });
};
