pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract NoteToken is StandardToken {
  string public name           = 'NoteToken';
  string public symbol         = 'NT';
  uint8  public demicals       = 2;
  uint   public INITIAL_SUPPLY = 12000;
  
  function NoteToken() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}
