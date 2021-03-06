const account = require("./account.json");
const { email, pw, deviceName, deviceUUID } = account;
const { Webhook } = require('discord-webhook-node');
const {Client, Collection, MessageEmbed} = require('discord.js');

var fs = require('fs');
const { CheckinData, ChannelInfo, ChannelClientMetaType } = require("node-kakao");
const node_kakao = require("node-kakao");
const $AuthApiClient = node_kakao.AuthApiClient;
const $ChatBuilder = node_kakao.ChatBuilder;
const $KnownChatType = node_kakao.KnownChatType;
const $KnownFeedType = node_kakao.KnownFeedType;
const $KnownPostItemType = node_kakao.KnownPostItemType;
const $MentionContent = node_kakao.MentionContent;
const $ReplyContent = node_kakao.ReplyContent;
const $ReplyAttachment = node_kakao.ReplyAttachment;
const $TalkClient = node_kakao.TalkClient;
const client = new $TalkClient();
const $AttachmentApi = node_kakao.AttachmentApi;
const $KnownPostFooterStyle = node_kakao.KnownPostFooterStyle;
const $ContactAttachment = node_kakao.ContactAttachment;
const $AttachmentContent = node_kakao.AttachmentContent;
const Long = node_kakao.Long;
const readline = require("readline");

const client1 = new Client({intents:32767})

const Lw = '\u200b'.repeat(500);

//ě¸í
discord_channel = '911296875750096937'
kakao_channel = '18337843489966057'
const hook = new Webhook("ěší");
//

client1.on('messageCreate',async message=>{
    if(message.channel.id == discord_channel) {
        if(message.author.discriminator == "0000") {
            return
        } else {
            ch = client.channelList.get(kakao_channel);
            ch.sendChat(`${message.author.username}#${message.author.discriminator}: ${message.content}`)
        }
    }
})

client.on('chat', (data, channel) => {
    const sender = data.getSenderInfo(channel);
    
    let roomId = channel.channelId;

    if(roomId == kakao_channel) {
        const IMAGE_URL = sender.originalProfileURL;
        hook.setUsername(sender.nickname);
        hook.setAvatar(IMAGE_URL);
        hook.send(data.text);
    }
});

client.on('disconnected', (reason) => {
    console.log('\ně°ę˛°ě´ ëę˛źěľëë¤');
});

async function main() {
	const api = await $AuthApiClient.create(deviceName, deviceUUID);
    const form = {
        email: email,
		password: pw,
		forced: true
    }
	loginRes = await api.login(form);
	if (!loginRes.success) {
        if (loginRes.status == -100) {
            loginRes = null;
            console.log("\n\ně¸ěŚě˝ëëĽź ěě˛­íë ě¤ěëë¤..");
            const passcodeRes = await api.requestPasscode(form);
            if (!passcodeRes.success) {
                console.log("\n[!] ě¸ěŚě˝ëëĽź ěě˛­íě§ ëŞťíěľëë¤||ěëŹě˝ë: " + passcodeRes.status);
                process.exit();
            }
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            let passcode = await new Promise(resolve => rl.question("[!] ě¸ěŚě˝ë: ", resolve));
            rl.close();
            const registerRes = await api.registerDevice(form, passcode, true);
            if (!registerRes.success) {
                console.log("\n\n[!] ëë°ě´ě¤ ëąëĄě ě¤í¨íěľëë¤: " + registerRes.status);
                process.exit();
            }
            console.log("\n\n[!] ëë°ě´ě¤ ëąëĄě ěąęłľíěľëë¤||UUID: '" + deviceUUID + "'");
            loginRes = await api.login(form);
            if (!loginRes.success) {
                console.log("\n\n[!] ëĄęˇ¸ě¸ ě¤í¨||ěëŹě˝ë: " + loginRes.status);
                process.exit();
            }
            console.log("\n\nëĄęˇ¸ě¸ ěąęłľ\n\n");
        } else {
            console.log("\n\n[!] ëĄęˇ¸ě¸ ě¤í¨||ěëŹě˝ë: " + loginRes.status)
            process.exit();
        }
    }
	const res = await client.login(loginRes.result);
	if (!res.success) throw new Error(`[!] ëĄęˇ¸ě¸ ě¤í¨||ěëŹě˝ë: ${res.status}`);
	console.log("\nëĄęˇ¸ě¸ ěąęłľ");
    accountUserId = loginRes.result.userId;
}
async function start() {
	await main();
    client1.login('ë´í í°')
}

start();
