// Importuje ethers w ten sposob tylko kiedy uzywam czystego JS
// We frameworkach instaluje ethers z npm i importuje normalnie
// jak kazda inna paczke
import { ethers } from "./ethers-5.6.esm.min.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.onclick = connect
fundButton.onclick = fund

// prettier-ignore
console.log("-\n--\n ethers \n >", ethers, "\n--\n-") // REMOVE_ME: remove when done!

// Sprawdzam czy wtyczka Metamask jest zainstalowana w przegladarce
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Wysylam request o polaczenie z dostepnymi kontami w Metamasku
      await window.ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }
    connectButton.innerHTML = "Connected!"
  } else {
    connectButton.innerHTML = "Please Install Metamask!"
  }
}

async function fund(ethAmount) {
  if (typeof window.ethereum !== "undefined") {
    // Rzeczy ktorych potrzebuje
    // provider / czyli placzenie z blockchainem
    // signer / wallet / czyli cos za czego zaplace za gaz
    // contract / z tego bede potrzebowal ABI i Address
  }
}
