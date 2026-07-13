(async () => {
    // Activate PiP on the active tab
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

    // Track usage
    const { pipCount = 0 } = await browser.storage.local.get("pipCount");
    const newCount = pipCount + 1;
    await browser.storage.local.set({ pipCount: newCount });

    // Close silently on non-donation turns
    if (newCount % 5 !== 0) {
        window.close();
        return;
    }

    // Show donation UI
    document.getElementById("donation").hidden = false;

    // Try to load Ko-fi profile avatar
    try {
        const res = await fetch("https://ko-fi.com/marukoshi");
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const img = doc.querySelector(".profile-picture img, .profileimg, img[class*='profile']");
        if (img?.src) {
            const avatar = document.getElementById("avatar");
            avatar.src = img.src;
            avatar.hidden = false;
            document.getElementById("avatar-fallback").hidden = true;
        }
    } catch {
        // fallback emoji stays visible
    }
})();
