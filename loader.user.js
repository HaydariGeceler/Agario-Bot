// ==UserScript==
// @name        HaydariLoader
// @namespace   HaydariLoader
// @description Grabs latest versions of the bot scripts automatically.
// @include     http://www.agariopvp.com/chat/
// @version     1.3
// @grant       none
// ==/UserScript==
var haydariLoaderVersion = 1.3;
var sha = "f4511ef305c6331f2bba1fe6b48bf8190ea10af5";

function getLatestCommit() {
	window.jQuery.ajax({
		url: "https://api.github.com/repos/HaydariGeceler/Agario-Bot/git/refs/heads/master",
		cache: false,
		dataType: "jsonp"
	}).done(function(data) {
		console.dir(data["data"])
		console.log("hmm: " + data["data"]["object"]["sha"]);
		sha = data["data"]["object"]["sha"];;
		window.jQuery.get('https://raw.githubusercontent.com/HaydariGeceler/Agario-Bot/master/launcher.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
			var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
			latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));
			latestVersion = parseFloat(latestVersion + 0.0000);
			var script1 = "https://cdn.rawgit.com/HaydariGeceler/Agario-Bot/" + sha + "/launcher.user.js";
			console.log("Script: " + script1);
			window.jQuery("body").append('<script type="text/javascript" src="' + script1 + '"></script>');
		});
		window.jQuery.get('https://raw.githubusercontent.com/HaydariGeceler/Agario-Bot/master/bot.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
			var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
			latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));
			latestVersion = parseFloat(latestVersion + 0.0000);
			var script2 = "https://cdn.rawgit.com/HaydariGeceler/Agario-Bot/" + sha + "/bot.user.js";
			console.log("Script: " + script2);
			window.jQuery("body").append('<script type="text/javascript" src="' + script2 + '"></script>');
		});

		function update(prefix, name, url) {
			window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
			window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
			window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
			window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
			window.jQuery('#' + prefix + 'Link').on('click', function() {
				window.jQuery("#" + prefix + "Dialog").hide();
				window.jQuery("#" + prefix + "Dialog").remove();
			});
			window.jQuery("#" + prefix + "Dialog").show();
		}
		window.jQuery.get('https://raw.githubusercontent.com/HaydariGeceler/Agario-Bot/master/loader.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
			var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
			latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));
			latestVersion = parseFloat(latestVersion + 0.0000);
			var myVersion = parseFloat(haydariLoaderVersion + 0.0000);
			if (latestVersion > myVersion) {
				update("haydariLoader", "loader.user.js", "https://github.com/HaydariGeceler/Agario-Bot/blob/master/loader.user.js/");
			}
			console.log('Current loader.user.js Version: ' + myVersion + " on Github: " + latestVersion);
		});
	}).fail(function() {});
}
getLatestCommit();
