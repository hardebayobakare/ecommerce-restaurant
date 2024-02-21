import { Billboard } from "@/types"
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

interface Query {
    isMainMenu?: boolean;
}

const getBillboards = async (query: Query): Promise<Billboard[]> => {

    const url = qs.stringifyUrl({
        url: URL,
        query:{
            isMainMenu: query.isMainMenu, 
        }
    })
    const res = await fetch(url);

    return res.json();
}

export default getBillboards;
