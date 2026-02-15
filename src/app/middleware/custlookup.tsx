export class API {
    private stats: []
    constructor() {
        this.stats = []
    }
    async plate(plateString: string, stateIdentifier: string) {
        const response = await fetch(`https://i.lookupaplate.com/license-plate/${stateIdentifier}/${plateString}`, {
            "cache": "default",
            "credentials": "include",
            "headers": {
                "Accept": "image/webp,image/avif,image/jxl,image/heic,image/heic-sequence,video/*;q=0.8,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Priority": "u=5, i",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15"
            },
            "method": "GET",
            "mode": "cors",
            "redirect": "follow",
            "referrer": "https://www.lookupaplate.com/",
            "referrerPolicy": "strict-origin-when-cross-origin"
        })

        console.log(await response.text())
    }
}