const tassi_cambio = {
    EUR: 1.00,
    USD: 1.09,
    RMB: 7.83,
    GBP: 0.86,
    CAD: 1.51
};

const celle = document.getElementById("celle");
const tasti = document.getElementById("tasti");

let cella_attuale = null;

function convertiValute() {
    if (cella_attuale.value === "") {
        const inputs = celle.querySelectorAll("input");
        inputs.forEach(input => input.value = "");
        return;
    }

    const valutaSorgente = cella_attuale.dataset.currency;
    const importoSorgente = parseFloat(cella_attuale.value);

    if (isNaN(importoSorgente)) return;

    const inEuro = importoSorgente / tassi_cambio[valutaSorgente];

    const inputs = celle.querySelectorAll("input");
    inputs.forEach(input => {
        if (input !== cella_attuale) {
            const valutaTarget = input.dataset.currency;
            const valoreConvertito = inEuro * tassi_cambio[valutaTarget];
            input.value = valoreConvertito.toFixed(2);
        }
    });
}

celle.addEventListener('click', (e) => {
    if (e.target.tagName !== 'INPUT') return;

    cella_attuale = e.target;
});

tasti.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    if (!cella_attuale) return;

    const valore_tasto = e.target.dataset.value;

    if (valore_tasto === "back") {
        cella_attuale.focus();
        const currentPos = cella_attuale.selectionStart;
        cella_attuale.setSelectionRange(currentPos - 1, currentPos - 1);
    }

    else if (valore_tasto === "forw") {
        cella_attuale.focus();
        const currentPos = cella_attuale.selectionStart;
        cella_attuale.setSelectionRange(currentPos + 1, currentPos + 1);
    }

    else if (valore_tasto === "AC") {
        cella_attuale.value = "";
    }

    else if (valore_tasto === "canc") {
        cella_attuale.value = cella_attuale.value.slice(0, -1);
    }

    else if (valore_tasto === "=") {
        try {
            cella_attuale.value = eval(cella_attuale.value);
        } catch {
            cella_attuale.value = "Errore";
        }
    }

    else {
        const startPos = cella_attuale.selectionStart;
        const endPos = cella_attuale.selectionEnd;
        const currentText = cella_attuale.value;

        // 2. Slice the text apart and glue the new button value right in the middle
        cella_attuale.value = 
            currentText.substring(0, startPos) + 
            valore_tasto + 
            currentText.substring(endPos);

        // 3. Put the cursor right back where it belongs (1 space after the typed number)
        cella_attuale.focus();
        cella_attuale.setSelectionRange(startPos + 1, startPos + 1);
    }

    convertiValute();
});

