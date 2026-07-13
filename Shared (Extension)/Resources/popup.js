const btn = document.getElementById("pip-btn");
const status = document.getElementById("status");

btn.addEventListener("click", async () => {
    btn.disabled = true;
    status.textContent = "";
    status.className = "";

    try {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
        const response = await browser.tabs.sendMessage(tab.id, { action: "activatePiP" });

        if (response?.success) {
            status.textContent = "Picture in Picture attivato!";
            status.className = "success";
        } else {
            status.textContent = response?.error ?? "Nessun video trovato.";
            status.className = "error";
        }
    } catch {
        status.textContent = "Ricarica la pagina e riprova.";
        status.className = "error";
    } finally {
        btn.disabled = false;
    }
});
