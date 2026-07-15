(async () => {
    // Count uses and decide what to show
    const { pipCount = 0 } = await browser.storage.local.get("pipCount");
    const newCount = pipCount + 1;
    await browser.storage.local.set({ pipCount: newCount });

    const isDonationTurn = (newCount % 5 === 0);

    if (isDonationTurn) {
        // Expand popup and show donation UI
        document.body.style.cssText = "";
        document.getElementById("glass").hidden = false;

        // Try to load Ko-fi avatar via Open Graph
        try {
            const res = await fetch("https://ko-fi.com/marukoshi");
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, "text/html");
            const ogImg = doc.querySelector('meta[property="og:image"]')?.getAttribute("content");
            if (ogImg) {
                const avatar = document.getElementById("avatar");
                avatar.onload = () => {
                    avatar.hidden = false;
                    document.getElementById("avatar-fallback").hidden = true;
                };
                avatar.src = ogImg;
            }
        } catch { /* emoji fallback stays */ }

    } else {
        // Activate PiP and close silently
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            browser.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    const videos = Array.from(document.querySelectorAll("video"));
                    const video = videos.find(v => !v.paused && v.readyState >= 2) ?? videos[0];
                    if (video) video.requestPictureInPicture().catch(() => {});
                }
            });
        }
        window.close();
    }
})();
