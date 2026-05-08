let html5QrcodeScanner;

function startScanner() {
    html5QrcodeScanner = new Html5Qrcode("reader");
    
    const config = { 
        fps: 15,                     
        qrbox: { width: 250, height: 250 } 
    };

    html5QrcodeScanner.start(
        { facingMode: "environment" }, 
        config, 
        onScanSuccess, 
        onScanFailure
    ).catch((err) => {
        console.error(err);
    });
}

function onScanSuccess(decodedText, decodedResult) {
    if (navigator.vibrate) {
        navigator.vibrate(100); 
    }

    html5QrcodeScanner.stop().then(() => {
        document.querySelector('.laser-line').style.display = 'none';

        const resultCard = document.getElementById("resultCard");
        const resultText = document.getElementById("resultText");

        if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
            resultText.innerHTML = `<a href="${decodedText}" target="_blank" style="color: #00b3ff;">${decodedText}</a>`;
        } else {
            resultText.textContent = decodedText;
        }

        resultCard.style.display = "block";
    }).catch((err) => {
        console.error(err);
    });
}

function onScanFailure(error) {
    
}

function resetScanner() {
    document.getElementById("resultCard").style.display = "none";
    document.querySelector('.laser-line').style.display = 'block';
    startScanner();
}

window.addEventListener("DOMContentLoaded", () => {
    startScanner();
});
