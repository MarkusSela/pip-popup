browser.action.onClicked.addListener((tab) => {
    browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const videos = Array.from(document.querySelectorAll("video"));
            const video = videos.find(v => !v.paused && v.readyState >= 2) ?? videos[0];
            if (video) {
                video.requestPictureInPicture().catch(console.error);
            }
        }
    });
});
