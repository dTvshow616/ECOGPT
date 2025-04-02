function cargarVariable(showAlert = true) {
  chrome.storage.local.get(['numOfUses'], (result) => {
    let numOfUses;

    if (result.numOfUses == undefined) {
      numOfUses = 0;
    } else if(result.numOfUses >= 30) {
      numOfUses = 0;
    } else {
      numOfUses = result.numOfUses;
    }

    numOfUses++;

    chrome.storage.local.set({ numOfUses }, () => {
      let carita;
      if (numOfUses < 10) {
        carita = ":)";
      } else if (numOfUses < 20) {
        carita = ":/";
      } else {
        carita = ":(";
      }

      if (showAlert) {
        alert("You have used ChatGPT " + numOfUses + " times today " + carita + "");
      }
    });

    let mensaje = document.getElementById("mensaje");
    if (mensaje) {
      let Ws = numOfUses * 200; /*1 Búsqueda = 200Ws*/
      let CO2_petroleo = (numOfUses * 0.014).toFixed(5); /*1 Búsqueda = 0.014g de CO2*/
      let CO2_renovables = (numOfUses * 0.0000022).toFixed(5); /*1 Búsqueda = 0.0000022g de CO2*/
      let Travel = numOfUses * 20;
      let Water = numOfUses;

      /*Append messages*/
      mensaje.innerHTML = `
        You have wasted ${Water} bottles of water!! <br><br>
        You have wasted ${Ws} Ws of energy.<br><br>
        Produced ${CO2_petroleo}g of CO2 with non-renewable energy.<br><br>
        Produced ${CO2_renovables}g of CO2 with renewable energy.<br><br>
        Could've traveled ${Travel}m in electric scooter.
      `;
    }

    /* La imagen va cambiando al igual que la carita*/
    /*Base: https://www.pngarts.com/files/10/Cartoon-Flowers-PNG-Download-Image.png*/
    let usageImage = document.getElementById("usageImage");
    if (usageImage) {
      if (numOfUses < 10) {
        usageImage.src = "images/viva.png"; 
      } else if (numOfUses < 20) {
        usageImage.src = "images/pocha.png"; 
      } else {
        usageImage.src = "images/rip.png"; 
      }
    }
  });
}

window.onload = function () {
  const isPopup = !!document.getElementById("mensaje");
  cargarVariable(!isPopup); /*Alert sólo al principio*/
};