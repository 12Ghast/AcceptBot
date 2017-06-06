const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');

const client = new SteamUser();
const community = new SteamCommunity();

const logOnOptions = {
	accountName: 'USERNAME', //STEAM USERNAME
	password: 'PASSWORD', //STEAM PASSWORD
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
	console.log('Logged into Steam');
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
	client.gamesPlayed(['Idling with Node.JS', 440]); //Idling Game; array, can link actual game IDs you own in order to increase hours.
});

client.on('webSession', (sessionid, cookies) => {
	manager.setCookies(cookies);
	community.setCookies(cookies);
});