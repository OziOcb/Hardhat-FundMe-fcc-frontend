// - https://docs.ethers.io/v5/getting-started/
// Importuje ethers w ten sposob tylko kiedy uzywam czystego JS
// We frameworkach instaluje ethers z npm i importuje normalnie
// jak kazda inna paczke
import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance

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

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(contractAddress)
    console.log(ethers.utils.formatEther(balance))
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value
  console.log(`Funding with ${ethAmount}`)
  if (typeof window.ethereum !== "undefined") {
    // Rzeczy ktorych potrzebuje
    // provider / czyli placzenie z blockchainem
    // signer / wallet / czyli cos za czego zaplace za gaz
    // contract / z tego bede potrzebowal abi i Address

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const txResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      })

      await listenForTxMine(txResponse, provider)
      console.log("Done!")
    } catch (error) {
      console.log(error)
    }
  }
}

function listenForTxMine(TxResponse, provider) {
  console.log(`Mining ${TxResponse.hash}...`)
  // Zwracam Promise zeby miec pewnosc ze JS zaczeka na provide.once listener
  return new Promise((resolve, reject) => {
    // provide.once to event listener - https://docs.ethers.io/v5/api/providers/provider/#Provider-once
    provider.once(TxResponse.hash, (txReceipt) => {
      console.log(`Completed with ${txReceipt.confirmations} confirmations`)
      resolve()
    })
  })
}
