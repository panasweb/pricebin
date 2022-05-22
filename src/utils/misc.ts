import Price from '@/types/interfaces/Price';
import md5 from 'md5'  // must add @types/md5

export const getGravatarURL = (email: string) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export const updatedAverage = (average: number, size: number, new_value: number) => {
    // Adds one value to a continuous average.
    return (size * average + new_value) / (size + 1);
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