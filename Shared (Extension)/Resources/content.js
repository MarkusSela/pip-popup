browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action !== "activatePiP") return;

    const videos = Array.from(document.querySelectorAll("video"));

    if (videos.length === 0) {
        sendResponse({ success: false, error: "Nessun video trovato in questa pagina." });
        return false;
    }

    // Prefer a playing video; fall back to the first one found
    const video = videos.find(v => !v.paused && v.readyState >= 2) ?? videos[0];

    video.requestPictureInPicture()
        .then(() => sendResponse({ success: true }))
        .catch(err => sendResponse({ success: false, error: err.message }));

    return true; // keep channel open for async sendResponse
});
