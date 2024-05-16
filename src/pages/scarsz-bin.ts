type Bin = {
    hits: number;
    server: {
        version: string;
        uptime: number;
    };
    generationTime: number;
    files: {
        name: string;
        description?: string;
        id: string;
        type: string;
        content: string;
    }[];
    description?: string;
    expiration: number;
    id: string;
    time: number;
}

async function decryptString(b64: string, keyString: string) {
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(keyString),
        { name: "AES-CBC" },
        false,
        ["decrypt"]
    );

    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const decryptedBytes = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv: bytes.slice(0, 16) },
        key,
        bytes.slice(16)
    );
    return new TextDecoder().decode(decryptedBytes);
}

const binUrlPattern = /^https:\/\/bin\.scarsz\.me\/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})#([a-zA-Z0-9]{32})$/;

const sidenavDiv = document.getElementById("sidenav") as HTMLDivElement;
const contentParagraph = document.getElementById("content") as HTMLParagraphElement;

(async () => {
    let url = window.prompt("Enter bin.scarsz.me URL") ?? "";
    let match;
    while (!(match = url.match(binUrlPattern))) {
        url = window.prompt("You did not enter a valid bin.scarsz.me URL. Try again.") ?? "";
    }
    const { [1]: uuid, [2]: key } = match;

    // fetch bin (using CORS proxy temporarily)
    const res = await fetch("https://corsproxy.io/?" + encodeURIComponent(`https://bin.scarsz.me/v1/${uuid}.json`));
    if (res.status === 404) return window.alert("Bin not found.");
    if (res.status !== 200) return window.alert(`Unexpected HTTP status: ${res.status}`);
    const bin: Bin = await res.json();

    // list files
    for (const f of bin.files) {
        const name = await decryptString(f.name, key);
        const anchor = document.createElement("a");
        anchor.textContent = name;
        anchor.onclick = async () => {
            const content = await decryptString(f.content, key);
            contentParagraph.innerText = content;
        }
        sidenavDiv.appendChild(anchor);
    }
})();
