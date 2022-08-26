// Sprawdzam czy wtyczka Metamask jest zainstalowana w przegladarce
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Wysylam request o polaczenie z dostepnymi kontami w Metamasku
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    document.getElementById("connectButton").innerHTML = "Connected!";
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please Install Metamask!";
  }
}
