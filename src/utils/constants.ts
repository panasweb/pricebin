import { SelectMixedOption } from 'naive-ui/lib/select/src/interface';
import IStore from '../types/IStore';
export const PRICEBIN_API = process.env.REACT_APP_API_URL;
export const WEEK_MILISECONDS : number = 1000 * 60 * 60 * 24 * 7;

export const DEFAULT_LOGO_SVG = '/logos/default.svg';
export const DEFAULT_PRODUCT_IMG = '/logos/default_product-32x32.png';
export const DEFAULT_STORE : IStore = {
    currency: 'MXN',
    currencyRate: 1,
    currentUser: null
}
export const SUPERUSER = 'geebproject@gmail.com';

interface CurrencyOption {
    label: string,
    value:string
}

export const CURRENCY_OPTIONS : SelectMixedOption[] = [
    {label: 'USD', value: 'USD'},
    {label: 'MXN', value: 'MXN'},
    {label: 'EUR', value: 'EUR'},
    {label: 'CAD', value: 'CAD'},
    {label: 'GBP', value: 'GBP'},
    {label: 'BRL', value: 'BRL'},
    {label: 'RUB', value: 'RUB'},
    {label: 'JPY', value: 'JPY'}, 
    {label: 'CNY', value: 'CNY'},
    {label: 'BTC', value: 'BTC'},
] 
export const PRODUCT_TYPES : string[] = ['Despensa', 'Electrónicos', 'Farmacia', 'Baño y Limpieza']

const _options : SelectMixedOption[] = PRODUCT_TYPES.map(productType => (
    {
        label: productType,
        value: productType
    }
));
const anyOption : SelectMixedOption = {
    label: 'Cualquier tipo',
    value: '',
}
_options.unshift(anyOption);

export const TYPES_OPTIONS : SelectMixedOption[] = _options;


export enum TYPES_ENUM {
    Despensa = 0,
    Electronicos = 1,
    Farmacia = 2,
    BanoyLimpieza=3
}

export const CURRENCY_SYMBOLS : Record<string,string> = {
    'USD': "$",
    'MXN': '$',
    'EUR': "€",
    'CAD': "$",
    'GBP':"£",
    'BRL':"R$",
    'RUB':"₽",
    'JPY':"¥",
    'CNY':"¥",
    'BTC':"BTC"
}

export const ADMIN_RANK = 10;

export const DEFAULT_AVI = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/132.png";