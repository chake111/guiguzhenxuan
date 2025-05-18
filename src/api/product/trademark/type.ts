export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}
export interface Trademark {
    id?: number,
    tmName: string,
    logoUrl: string,
}
export type Records = Trademark[];
export interface TrademarkResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        page: number,
    }
}