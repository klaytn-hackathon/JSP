/* eslint-disable no-undef */
import { cav } from './caver';

const PetitionContract = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

export default PetitionContract;
