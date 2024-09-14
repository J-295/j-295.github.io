"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlSanitise = htmlSanitise;
function htmlSanitise(txt) {
    return txt
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
