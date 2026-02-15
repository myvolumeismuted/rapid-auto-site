import * as puppeteer from "puppeteer"

export class API {

    constructor() {
        this.stats = []
        this.cookies = []
    }

    formatCookies() {
        return this.cookies.map((string) => {
            return string.split(";")[0]
        }).join(", ")
    }


    async plate(plateString, stateIdentifier) {
        const idens = [{ state: "alabama", abbreviation: "al" }, { state: "alaska", abbreviation: "ak" }, { state: "arizona", abbreviation: "az" }, { state: "arkansas", abbreviation: "ar" }, { state: "california", abbreviation: "ca" }, { state: "colorado", abbreviation: "co" }, { state: "connecticut", abbreviation: "ct" }, { state: "delaware", abbreviation: "de" }, { state: "florida", abbreviation: "fl" }, { state: "georgia", abbreviation: "ga" }, { state: "hawaii", abbreviation: "hi" }, { state: "idaho", abbreviation: "id" }, { state: "illinois", abbreviation: "il" }, { state: "indiana", abbreviation: "in" }, { state: "iowa", abbreviation: "ia" }, { state: "kansas", abbreviation: "ks" }, { state: "kentucky", abbreviation: "ky" }, { state: "louisiana", abbreviation: "la" }, { state: "maine", abbreviation: "me" }, { state: "maryland", abbreviation: "md" }, { state: "massachusetts", abbreviation: "ma" }, { state: "michigan", abbreviation: "mi" }, { state: "minnesota", abbreviation: "mn" }, { state: "mississippi", abbreviation: "ms" }, { state: "missouri", abbreviation: "mo" }, { state: "montana", abbreviation: "mt" }, { state: "nebraska", abbreviation: "ne" }, { state: "nevada", abbreviation: "nv" }, { state: "new hampshire", abbreviation: "nh" }, { state: "new jersey", abbreviation: "nj" }, { state: "new mexico", abbreviation: "nm" }, { state: "new york", abbreviation: "ny" }, { state: "north carolina", abbreviation: "nc" }, { state: "north dakota", abbreviation: "nd" }, { state: "ohio", abbreviation: "oh" }, { state: "oklahoma", abbreviation: "ok" }, { state: "oregon", abbreviation: "or" }, { state: "pennsylvania", abbreviation: "pa" }, { state: "rhode island", abbreviation: "ri" }, { state: "south carolina", abbreviation: "sc" }, { state: "south dakota", abbreviation: "sd" }, { state: "tennessee", abbreviation: "tn" }, { state: "texas", abbreviation: "tx" }, { state: "utah", abbreviation: "ut" }, { state: "vermont", abbreviation: "vt" }, { state: "virginia", abbreviation: "va" }, { state: "washington", abbreviation: "wa" }, { state: "west virginia", abbreviation: "wv" }, { state: "wisconsin", abbreviation: "wi" }, { state: "wyoming", abbreviation: "wy" }]
        const response = await fetch('https://api.auto.dev/plate/CA/ABC123', {
            headers: {
              Authorization: 'Bearer sk_ad_XeYlLlHPAPlsEcG0O8bVlgES',
              'Content-Type': 'application/json',
            },
          })
          const plateData = await response.json()
          console.log(plateData)
    }
}


async function main() {
    const api = new API()
    api.plate("TJY3601", "VA")
}



main()