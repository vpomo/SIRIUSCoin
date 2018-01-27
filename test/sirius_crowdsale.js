var SIRCrowdsale = artifacts.require("./SIRCrowdsale.sol");
//import assertRevert from './helpers/assertRevert';

contract('SIRCrowdsale', (accounts) => {
    var contract;
    var owner = "0x02882944f2bA15818A306DeE1d91FbA6D03d12A6";
    var rate = 1000;
    var buyWei = 5 * 10**17;
    var rateNew = 1000;
    var buyWeiNew = 5 * 10**17;
    var buyWeiMin = 3 * 10**15;
    var buyWeiCap = 600 * 10**24;

    var totalSupply = 50 * 10**24;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await SIRCrowdsale.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance owner contract', async ()  => {
        var balanceOwner = await contract.balanceOf(owner);
        //console.log("balanceOwner = " + balanceOwner);
        assert.equal(totalSupply, balanceOwner);
    });

/*
    it('verification date', async ()  => {
        var result = await contract.testDate.call();
        //console.log("result = " + result);
        assert.equal(true, result);
    });
*/


    it('verification of receiving Ether', async ()  => {
        var tokenAllocatedBefore = await contract.tokenAllocated.call();
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var weiRaisedBefore = await contract.weiRaised.call();
        //console.log("tokenAllocated = " + tokenAllocatedBefore);

        await contract.buyTokens(accounts[2],{from:accounts[2], value:buyWei});
        var tokenAllocatedAfter = await contract.tokenAllocated.call();
        //console.log("tokenAllocatedAfter = " + tokenAllocatedAfter);

        assert.isTrue(tokenAllocatedBefore < tokenAllocatedAfter);
        assert.equal(0, tokenAllocatedBefore);
        assert.equal(rate*buyWei, tokenAllocatedAfter);

        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(rate*buyWei, balanceAccountTwoAfter);

        var weiRaisedAfter = await contract.weiRaised.call();
        //console.log("weiRaisedAfter = " + weiRaisedAfter);
        assert.isTrue(weiRaisedBefore < weiRaisedAfter);
        assert.equal(0, weiRaisedBefore);
        assert.equal(buyWei, weiRaisedAfter);

        var depositedAfter = await contract.getDeposited.call(accounts[2]);
        //console.log("DepositedAfter = " + depositedAfter);
        assert.equal(buyWei, depositedAfter);


        var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        await contract.buyTokens(accounts[3],{from:accounts[3], value:buyWeiNew});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        assert.equal(0, balanceAccountThreeBefore);
        //console.log("balanceAccountThreeAfter = " + balanceAccountThreeAfter);
        assert.equal(rateNew*buyWeiNew, balanceAccountThreeAfter);

        var balanceOwnerAfter = await contract.balanceOf(owner);
        //console.log("balanceOwner = " + Number(balanceOwnerAfter));
        //assert.equal(Number(totalSupply - balanceAccountThreeAfter - balanceAccountTwoAfter), Number(balanceOwnerAfter));

    });


/*
    it('verification tokens limit min amount', async ()  => {
        await contract.buyTokens(accounts[2],{from:accounts[2], value:buyWeiMin});
    });
*/


    it('verification tokens cap reached', async ()  => {
            var numberTokensNormal = await contract.validPurchaseTokens.call(buyWei);
            //console.log("numberTokensNormal = " + numberTokensNormal);
            assert.equal(rate*buyWei, numberTokensNormal);

            var numberTokensFault = await contract.validPurchaseTokens.call(buyWeiCap);
            //console.log("numberTokensFault = " + numberTokensFault);
            assert.equal(0, numberTokensFault);
    });


});



