import crypto from './instance/cryptoInstance';
import normal from './instance/normalInstance';
import { URL_ENUM } from './data/urlDictionary';

export const URL_DIC = URL_ENUM;
export const cryptoInstance = crypto;
export const normalInstance = normal;
