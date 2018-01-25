const SIRCrowdsale = artifacts.require('./SIRCrowdsale.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm

    //var startTime = 1516838400; //25 Jan 2018, 00:00:00 GMT

    var startTime = 1517101200; //28 Jan 2018, 01:00:00 GMT
    var endTime = 1519603199; //25 Feb 2018, 23:59:59 GMT
    var owner = "0x02882944f2bA15818A306DeE1d91FbA6D03d12A6";
    var wallet = "0xac838aee2f650a6b970ecea56d4651653c1f84a1";

    deployer.deploy(SIRCrowdsale, startTime, endTime, owner, wallet);

};
