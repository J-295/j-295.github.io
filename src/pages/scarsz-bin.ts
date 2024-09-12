import { getUrl } from "scarsz-bin";

const sidenavDiv = document.getElementById("sidenav") as HTMLDivElement;
const contentPre = document.getElementById("content") as HTMLPreElement;
const binUrlButton = document.getElementById("bin-url-button") as HTMLButtonElement;
const binUrlInput = document.getElementById("bin-url-input") as HTMLInputElement;
const initialContentDiv = document.getElementById("initial-content-div") as HTMLDivElement;

binUrlButton.onclick = () => handleInput(binUrlInput.value);
binUrlInput.onkeydown = (ev) => {
    if (ev.key === "Enter") handleInput(binUrlInput.value);
};

async function handleInput(url: string) {
    let bin;
    try {
        bin = await getUrl(url);
    } catch (err) {
        console.error(err);
        return window.alert("Failed to fetch bin. Did you input a valid bin URL?");
    }
    if (bin === null) return window.alert("Bin not found.");

    initialContentDiv.remove();

    // list files
    for (const f of bin.files) {
        const anchor = document.createElement("a");
        anchor.textContent = f.name;
        anchor.onclick = async () => {
            contentPre.innerText = f.content;
        }
        // on right click
        anchor.oncontextmenu = async (ev) => {
            ev.preventDefault();
            navigator.clipboard.writeText(f.content);
            anchor.innerHTML = "<span style=\"color:lime;\">Copied to clipboard!</span>";
            setTimeout(() => {
                anchor.textContent = f.name;
            }, 1000);
        }
        sidenavDiv.appendChild(anchor);
    }
}
