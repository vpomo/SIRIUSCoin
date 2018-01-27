const SIRCrowdsale = artifacts.require('./SIRCrowdsale.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm

    var startTime = 1517446800; //01 Feb 2018, 01:00:00 GMT
    var owner = "0x02882944f2bA15818A306DeE1d91FbA6D03d12A6";
    var wallet = "0x4F865D287A0D92093e27aDe86dbd8e6BFF4b3Aa9";

    deployer.deploy(SIRCrowdsale, startTime, owner, wallet);

};
