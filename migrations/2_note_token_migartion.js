const NoteToken = artifacts.require("./NoteToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NoteToken);
};
