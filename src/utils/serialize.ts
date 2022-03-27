import Store from "@/types/Store";

// not useful; as store ids may be undefined. We should let the database handle ids for us
export const toObject = (instance: any) : object => {

    const obj : any = {}

    console.log("serializing", typeof instance);
    for (const key in instance) {
        if ((instance)[key] instanceof Date) {
            (obj)[key] = (instance)[key].toISOString().slice(0, 10);
        }

        else if ((instance)[key] instanceof Array) {
            (obj)[key] = [];
            for (const x in (instance)[key]) {
                obj[key].push(toObject(x));
            }
        } 
        
        else if (instance[key] instanceof Store){
            obj[key] = instance[key].id;
        } 
        
        else {
            obj[key] = instance[key] 
        }
    }
    return obj as object;
}