(async () => {
    // Reset popup immediately so the next click goes back to PiP (onClicked)
    browser.action.setPopup({ popup: "" });

    // Try to load Ko-fi avatar via Open Graph image
    try {
        const res = await fetch("https://ko-fi.com/marukoshi");
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const ogImg = doc.querySelector('meta[property="og:image"]')?.getAttribute("content");
        if (ogImg) {
            const avatar = document.getElementById("avatar");
            avatar.src = ogImg;
            avatar.onload = () => {
                avatar.hidden = false;
                document.getElementById("avatar-fallback").hidden = true;
            };
        }
    } catch {
        // emoji fallback stays visible
    }
})();
