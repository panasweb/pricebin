import md5 from 'md5'  // must add @types/md5

export const getGravatarURL = (email: string) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}

export const updatedAverage = (average:number, size:number, new_value:number) => {
    // Adds one value to a continuous average.
    return (size * average + new_value) / (size + 1);
}

export const productNameToID = (name:string) : string => {
    return (name.normalize("NFD").replace(/\p{Diacritic}/gu, "")).toLowerCase().replace(/ +/g,'-').replace(/[()]+/g,'');
}

export const formatAmt = (amount:number|string) : string => {
    if (typeof amount === "number") {
        return amount.toFixed(2);
    }
    else {
        return Number.parseFloat(amount as string).toFixed(2);
    }
}