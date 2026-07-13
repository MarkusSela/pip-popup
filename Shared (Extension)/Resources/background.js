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

    // Count PiP uses; after every 5th, the NEXT click opens the donation popup
    const { pipCount = 0 } = await browser.storage.local.get("pipCount");
    const newCount = pipCount + 1;
    await browser.storage.local.set({ pipCount: newCount });

    if (newCount % 5 === 0) {
        browser.action.setPopup({ popup: "popup.html" });
    }
});
