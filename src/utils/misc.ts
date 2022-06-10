import Price from '@/types/interfaces/Price';
import md5 from 'md5'  // must add @types/md5
import { CURRENCY_SYMBOLS } from './constants';
import IStore from "@/types/IStore"
import { exampleProducts } from '@/models/exampleProducts';

export const getGravatarURL = (email: string) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export const updatedAverage = (average: number, size: number, new_value: number) => {
    // Adds one value to a continuous average.
    return (size * average + new_value) / (size + 1);
}

export const toCurrency = (amount:number, store:IStore|undefined) : string => {
    return `${CURRENCY_SYMBOLS[store?.currency||"MXN"]} ${store?.getConvertedAmount ? store?.getConvertedAmount(amount).toFixed(2) : amount.toFixed(2)}`
}

export const productNameToID = (name: string): string => {
    return (name.normalize("NFD").replace(/\p{Diacritic}/gu, "")).toLowerCase().replace(/ +/g, '-').replace(/[()]+/g, '');
}

export const formatAmt = (amount: number | string): string => {
    if (typeof amount === "number") {
        return amount.toFixed(2);
    }
    else {
        return Number.parseFloat(amount as string).toFixed(2);
    }
}

const degreesToRadians = (degrees:number) : number => {
    return degrees * Math.PI / 180;
  }
  
function distanceInKmBetweenEarthCoordinates(lat1:number, lon1:number, lat2:number, lon2:number) : number {
    const earthRadiusKm = 6371;
  
    const dLat = degreesToRadians(lat2-lat1);
    const dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

export function computeDistanceKm(lat1:number, lon1:number, lat2:number, lon2:number):number {
    return Math.round(distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2))
}


export const getMinPrice = (prices: Price[]) : number | null => {
    if (!prices.length) return null;
    let minprice : number = prices[0].amount;
    prices.forEach(price => {
        minprice = Math.min(price.amount, minprice);
    })

    return minprice;
}

export const serializePrices = (prices: Price[], priceVotes: Record<string, number>): Price[] => {

    if (!priceVotes) {
        return prices.map(p => {
            const dateWithoutTime = new Date(p.date);
            dateWithoutTime.setHours(0, 0, 0, 0);
            return {
                ...p,
                date: dateWithoutTime
            }
        })
    }

    return prices.map(p => {
        const dateWithoutTime = new Date(p.date);
        dateWithoutTime.setHours(0, 0, 0, 0);
        return {
            ...p,
            date: dateWithoutTime,
            votes: priceVotes[p._id!]
        }
    })
}

export const byVotesThenDateThenAmount = (a: Price, b: Price) => {
    // First by votes, decreasing
    if (a.votes! > b.votes!) {
        return -1;
    }
    if (a.votes! < b.votes!) {
        return 1;
    }
    
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }

    if (a.amount < b.amount) {
        return -1;
    }
    if (a.amount > b.amount) {
        return 1;
    }
    return 0;
}

export const byDateThenVotesThenAmount = (a: Price, b: Price) => {
    // First by date, most recent first
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }
    // Then by votes, decreasing
    if (a.votes! > b.votes!) {
        return -1;
    }
    if (a.votes! < b.votes!) {
        return 1;
    }
    // Then by price amount, increasing
    if (a.amount < b.amount) {
        return -1;
    }
    if (a.amount > b.amount) {
        return 1;
    }
    return 0;
}