import axios from 'axios'

import Vote from '../types/interfaces/Vote'

const url = 'http://localhost:3010/votes/';

interface PriceCount {
    PriceKey: string,
    count: number
}

const VotesManager = {
    
    getVoteCounts: async function(priceIds: string[]) : Promise<Record<string, number>> {
        try {
            const {data} = await axios.post(
                url  + 'price/counts',
                {priceIds}
            );
            console.log("Counts as response", data);

            const counts : Record<string, number> = {}
            for (const pc of data) {
                counts[pc.PriceKey] = pc.count;
            }
            console.log("Counts as dic", counts);
            return counts;
        }
        catch (e) {
            console.error(e);
            return {}
        }
    }
}

export default VotesManager