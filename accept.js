const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
var request = require('request');
const api = 'STEAM-API-KEY';

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
	steam: client,
	community: community,
	language: 'en'
});

const logOnOptions = {
	accountName: 'USERNAME',
	password: 'PASSWORD',
	twoFactorCode: SteamTotp.generateAuthCode('shared_secret')
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
	console.log('Logged into Steam');
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
	client.gamesPlayed(['Idling with Node.JS', 730, 24980, 440, 8870, 49520, 204880, 218620]); //Idling Game
});

client.on('webSession', (sessionid, cookies) => {
	manager.setCookies(cookies);
	community.setCookies(cookies);
	community.startConfirmationChecker(10000, 'identity_secret');
});

manager.on('newOffer', (offer) => {
	if (offer.itemsToGive.length === 0) {
		offer.accept((err, status) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Donation accepted. Status: ${status}.`);
			}
		});
	}
});
