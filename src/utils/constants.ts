import IStore from '../types/IStore';
export const WEEK_MILISECONDS : number = 1000 * 60 * 60 * 24 * 7;

export const DEFAULT_LOGO_SVG = '/logos/default.svg';
export const DEFAULT_PRODUCT_IMG = '/logos/default_product-32x32.png';
export const DEFAULT_STORE : IStore = {
    currency: 'MXN',
    currencyRate: 1,
    currentUser: null
}

export const PRODUCT_TYPES = ['Despensa', 'Electrónicos', 'Farmacia', 'Baño y Limpieza']

export const ADMIN_RANK = 10;

export const DEFAULT_AVI = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/132.png";