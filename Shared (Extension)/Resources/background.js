browser.action.onClicked.addListener(async (tab) => {
    const { pipCount = 0 } = await browser.storage.local.get("pipCount");
    const newCount = pipCount + 1;
    await browser.storage.local.set({ pipCount: newCount });

    await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: activatePiP
    });

    if (newCount % 5 === 0) {
        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            func: showDonationBanner
        });
    }
});

function activatePiP() {
    const videos = Array.from(document.querySelectorAll("video"));
    const video = videos.find(v => !v.paused && v.readyState >= 2) ?? videos[0];
    if (video) {
        video.requestPictureInPicture().catch(console.error);
    }
}

function showDonationBanner() {
    document.getElementById("_pip-popup-banner")?.remove();

    const banner = document.createElement("div");
    banner.id = "_pip-popup-banner";
    banner.style.cssText = [
        "position:fixed", "bottom:24px", "right:24px", "z-index:2147483647",
        "background:#ffffff", "border-radius:18px",
        "box-shadow:0 8px 40px rgba(0,0,0,0.18)", "padding:18px 20px",
        "width:272px", "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        "animation:_pip-slide-in 0.35s cubic-bezier(.22,1,.36,1)"
    ].join(";");

    banner.innerHTML = `
        <style>
            @keyframes _pip-slide-in {
                from { transform: translateY(16px); opacity: 0; }
                to   { transform: translateY(0);    opacity: 1; }
            }
        </style>
        <button id="_pip-close" style="position:absolute;top:12px;right:14px;background:none;border:none;font-size:20px;line-height:1;cursor:pointer;color:#aeaeb2;">×</button>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span style="font-size:28px;line-height:1;">☕</span>
            <div>
                <div style="font-size:14px;font-weight:700;color:#1c1c1e;">PiP Popup is free</div>
                <div style="font-size:12px;color:#6e6e73;">and always will be 🙏</div>
            </div>
        </div>
        <p style="font-size:13px;color:#3c3c43;margin:0 0 14px;line-height:1.5;">
            If you find it useful, consider supporting the project — it helps keep it alive!
        </p>
        <a href="https://ko-fi.com/markussela" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#FF5E5B;color:#fff;text-decoration:none;padding:10px 0;border-radius:12px;font-size:14px;font-weight:600;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/></svg>
            Support on Ko-fi — MarkusSela
        </a>
    `;

    document.body.appendChild(banner);
    document.getElementById("_pip-close").onclick = () => banner.remove();
    setTimeout(() => banner.remove(), 15000);
}
