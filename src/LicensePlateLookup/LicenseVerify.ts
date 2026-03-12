import fetch from "node-fetch"

export class LicensePlateLookup {
    public current: string
    public last: string
    constructor() {
        this.current = ""
        this.last = ""
    }

    async get(plate: string, state: string) {
        const states = {
            "VA": "Virginia"
        }
        const response = fetch("https://pos.secure.carfax.com/vehicleDataByPlateState", {
            "body": `{\"plate\":\"thg7527\",\"state\":\"VA\"}`,
            "headers": {
                "Accept": "application/json",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json",
                "cp-request-id": "632fc419-dea6-4a2f-9a0d-965f329aa26e",
                "Pragma": "no-cache",
                "Priority": "u=3, i",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Safari/605.1.15",
                "x-datadome-clientid": "Y1y2lagn3Q84C36YOiKSIM8Xu3Hm~Q76h2rGYzBzE7hDoDjz7zCQUfJlXmP12bMfeG_edo3tMX0PY8ObQLjCibmXjaXF3UPXBspeKe1u16Ab8u87OXrnjM7w8Uk2kr6o"
            },
            "method": "POST",
            "redirect": "follow",
        })

        return (await response).json()
    }
}

