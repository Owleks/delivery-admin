import {DEV} from './dev';
import {PROD} from './prod';

export const ENVIRONMENT = process.env.NODE_ENV === 'development' ? DEV : PROD;