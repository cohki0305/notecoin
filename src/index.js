import Web3 from 'web3'

import Contract from 'truffle-contract'
import token from '../build/contracts/NoteToken.json'

import $ from 'jquery';

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
const web3 = new Web3(provider)

const contract = Contract(token)
contract.setProvider(provider)

if (typeof contract.currentProvider.sendAsync !== "function") {
  contract.currentProvider.sendAsync = function () {
    return contract.currentProvider.send.apply(
      contract.currentProvider, arguments
    )
  }
}

const App = {
  async init() {
    const accounts = await web3.eth.getAccounts()
    this.account = accounts[0]

    this.instance = await contract.deployed()
    this.showBalance()
  },
  async showBalance() {
    const balance = await this.instance.balanceOf(this.account)
    $('#balance').text(balance + ' NT');
  },
  async transfer() {
    const address = $('#address').val();
    const amount = parseInt($('#amount').val());

    await this.instance.transfer(address, amount, {from: this.account})
    alert('送信に成功しました！')
    this.showBalance()
  }
}

$('#transferButton').on('click', ()=> {
  App.transfer()
})

window.onload = () => {
  App.init()
}
