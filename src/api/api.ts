
export type getValutesAPIType = {
    base_ccy?: string
    buy: string
    ccy: string
    sale: string
}

type ValutesType = Array<getValutesAPIType>
export const ValutesAPI = {
    getValutes: ():Promise<ValutesType> => {
        return fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').then(response => response.json())
    }
}
