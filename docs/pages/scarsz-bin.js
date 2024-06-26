"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function decryptString(b64, keyString) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield crypto.subtle.importKey("raw", new TextEncoder().encode(keyString), { name: "AES-CBC" }, false, ["decrypt"]);
        const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
        const decryptedBytes = yield crypto.subtle.decrypt({ name: "AES-CBC", iv: bytes.slice(0, 16) }, key, bytes.slice(16));
        return new TextDecoder().decode(decryptedBytes);
    });
}
const binUrlPattern = /^https:\/\/bin\.scarsz\.me\/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})#([a-zA-Z0-9]{32})$/;
const sidenavDiv = document.getElementById("sidenav");
const contentPre = document.getElementById("content");
const binUrlButton = document.getElementById("bin-url-button");
const binUrlInput = document.getElementById("bin-url-input");
const initialContentDiv = document.getElementById("initial-content-div");
if (binUrlPattern.test(location.hash.slice(1))) {
    handleInput(location.hash.slice(1));
}
else {
    binUrlButton.onclick = () => handleInput(binUrlInput.value);
    binUrlInput.onkeydown = (ev) => {
        if (ev.key === "Enter")
            handleInput(binUrlInput.value);
    };
}
function handleInput(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // extract uuid/key
        const match = url.match(binUrlPattern);
        if (!match)
            return window.alert("Invalid bin.scarsz.me URL!");
        const { [1]: uuid, [2]: key } = match;
        initialContentDiv.innerHTML = "<p>Fetching bin...</p>";
        // fetch bin (using CORS proxy temporarily)
        const res = yield fetch("https://corsproxy.io/?" + encodeURIComponent(`https://bin.scarsz.me/v1/${uuid}.json`));
        if (res.status === 404)
            return window.alert("Bin not found.");
        if (res.status !== 200)
            return window.alert(`Unexpected HTTP status: ${res.status}`);
        const bin = yield res.json();
        initialContentDiv.remove();
        // list files
        for (const f of bin.files) {
            const name = yield decryptString(f.name, key);
            const anchor = document.createElement("a");
            anchor.textContent = name;
            anchor.onclick = () => __awaiter(this, void 0, void 0, function* () {
                const content = yield decryptString(f.content, key);
                contentPre.innerText = content;
            });
            // on right click
            anchor.oncontextmenu = (ev) => __awaiter(this, void 0, void 0, function* () {
                ev.preventDefault();
                navigator.clipboard.writeText(yield decryptString(f.content, key));
                anchor.innerHTML = "<span style=\"color:lime;\">Copied to clipboard!</span>";
                setTimeout(() => {
                    anchor.textContent = name;
                }, 1000);
            });
            sidenavDiv.appendChild(anchor);
        }
    });
}
