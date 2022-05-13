import axios from 'axios'
import { StepsInjection } from 'naive-ui/lib/steps/src/Steps';
import { ScrollbarThemeVars } from 'naive-ui/lib/_internal/scrollbar/styles';
import Vote from '../types/interfaces/Vote'


const url = 'http://localhost:3010/votes/';

interface PriceCount {
    PriceKey: string,
    count: number
}

const VotesManager = {

    addVote: async function(UserKey: string, PriceKey: string) : Promise<string|null>{
        // check first if vote exists
        try{
            const hasVoted = await this.checkUserVote(UserKey, PriceKey);
            if (hasVoted) {
                console.log("already voted", UserKey, PriceKey);
                return null;
            }

            const {data} = await axios.post(
                url,
                {UserKey, PriceKey}
            );
            return data
        }
        catch (e) {
            console.error("Error voting ", e);
            return "Error"
        }
    },

    checkUserVote: async function(UserKey: string, PriceKey: string) : Promise<boolean>{
        // UserKey is an email this time
        try{
            const {data} = await axios.get(
                url + 'user/' + UserKey + '/' + PriceKey
            );
            return data.doc !== null;
        }
        catch(e){
            console.error("Error getting user vote", e);
            return false;
        }
    },
    
    deleteVote: async function(UserKey: string, PriceKey: string) : Promise<string>{
        try{
            const {data} = await axios.post(
                url + 'delete/vote',
                {UserKey, PriceKey}
            );
            return data
        }
        catch(e){
            console.error("Error deleting vote ", e)
            return "Error"
        }
    },

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