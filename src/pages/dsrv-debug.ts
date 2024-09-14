import { getUrl } from "scarsz-bin";
import { tests } from "./dsrv-debug-tests";
import { htmlSanitise } from "../common";
import { DebugData, extractDebugData } from "./dsrv-debug-data";

const btnScan = document.getElementById("btnScan") as HTMLButtonElement;
const inpUrl = document.getElementById("inpUrl") as HTMLInputElement;
const divScanResults = document.getElementById("divScanResults") as HTMLDivElement;

btnScan.onclick = () => scan();
inpUrl.onkeydown = (ev) => { if (ev.key === "Enter") scan(); };

async function scan() {
    const url = inpUrl.value.trim();
    let bin;
    try {
        divScanResults.innerHTML = "<p>Loading...</p>";
        bin = await getUrl(url);
    } catch (err) {
        console.error(err);
        divScanResults.innerHTML = "<p style='color: yellow;'>Failed to load bin. Did you input a valid bin URL?</p>";
        return;
    }
    if (bin === null) {
        divScanResults.innerHTML = "<p style='color: yellow;'>Bin not found.</p>";
        return;
    }
    divScanResults.innerHTML = "";

    let data;
    try {
        data = extractDebugData(bin);
        console.debug(data);
    } catch (err) {
        console.error(err);
        divScanResults.innerHTML = "<p style='color: yellow;'>Failed to extract debug data.</p>";
        return;
    }

    for (const category of Object.keys(tests)) {
        const categoryResults: string[] = [];
        for (const test of Object.keys(tests[category])) {
            try {
                let html = tests[category][test](data);
                if (html) categoryResults.push(html);
            } catch (err) {
                console.error(err);
                categoryResults.push(`<p style='color: yellow;'>Test "${htmlSanitise(test)}" failed.</p>`);
            }
        }
        if (categoryResults.length) {
            divScanResults.innerHTML += `<h4><i>${htmlSanitise(category)}</i></h4>`;
            for (const result of categoryResults) {
                divScanResults.innerHTML += result;
            }
        }
    }

    if (divScanResults.innerHTML === "") {
        divScanResults.innerHTML = "<p>No issues found.</p>";
    }
}
