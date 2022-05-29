import { SelectMixedOption } from 'naive-ui/lib/select/src/interface';
import IStore from '../types/IStore';
export const WEEK_MILISECONDS : number = 1000 * 60 * 60 * 24 * 7;

export const DEFAULT_LOGO_SVG = '/logos/default.svg';
export const DEFAULT_PRODUCT_IMG = '/logos/default_product-32x32.png';
export const DEFAULT_STORE : IStore = {
    currency: 'MXN',
    currencyRate: 1,
    currentUser: null
}

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