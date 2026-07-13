browser.action.onClicked.addListener(async (tab) => {
    // Activate PiP immediately
    await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const videos = Array.from(document.querySelectorAll("video"));
            const video = videos.find(v => !v.paused && v.readyState >= 2) ?? videos[0];
            if (video) video.requestPictureInPicture().catch(console.error);
        }
    });

    // Track usage and show donation popup every 5 uses
    const { pipCount = 0 } = await browser.storage.local.get("pipCount");
    const newCount = pipCount + 1;
    await browser.storage.local.set({ pipCount: newCount });

    if (newCount % 5 === 0) {
        browser.windows.create({
            url: browser.runtime.getURL("popup.html"),
            type: "popup",
            width: 320,
            height: 260
        });
    }
});
