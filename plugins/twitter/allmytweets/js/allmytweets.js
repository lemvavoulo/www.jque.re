/**
 * All My Tweets
 * © 2012 Airtight Interactive.
 * www.airtight.cc
 * v0.9.1
 */

var _pageId; 
var _loadedCount;
var _showingResults;
var _screenName;
var _hideRetweets;
var _hideReplies;
var _maxId;

$(document).ready(function() {

	if(window.location.hash) {
		//backward compatibility with old hashtag urls: #felixturner
		_screenName = window.location.hash.substr(1);
	}else{
		_screenName = getUrlVars()["screen_name"];
	}

	_showingResults = _screenName !== undefined;

	if (_showingResults){

		_hideReplies = getUrlVars()["hide_replies"];
		_hideRetweets = getUrlVars()["hide_retweets"];

		//set checkboxes from qstring
		$('#replies').prop('checked', _hideReplies);
		$('#retweets').prop('checked', _hideRetweets);

		//get tweets
		$("#input_form").hide();
		getTweets();

		//track hash tags based on http://stackoverflow.com/questions/4811172/is-it-possible-to-track-hash-links-like-pages-with-google-analytics
		//_gaq.push(['_trackPageview',location.pathname + location.search  + location.hash]);


	}else{

		//init input form
		$("#result").hide();
		$('#input_form').submit(function() {
			onSubmitClick();
			return false;
		});
	}

	$('#replies').click(function () {
		onCheckboxClick();
	});
	$('#retweets').click(function () {
		onCheckboxClick();
	});

});

function onSubmitClick() {
	if ($("#input_name").val()){
		_screenName = $("#input_name").val();
		setQString();
	}
}

function setQString(){
	var qs = "?screen_name=" + _screenName;
	if ($("#replies").is(":checked")) qs += "&hide_replies=true";
	if ($("#retweets").is(":checked")) qs += "&hide_retweets=true";
	document.location =  qs;
}

function onCheckboxClick(){
	//if on results page - resubmit
	if (_showingResults){
		setQString();
	}
}

function getTweets() {
	
	$("#profile_img").hide();
	$("#tweets ul").empty();
	$("#results").show();
	$("#user_name").text(_screenName);
	$("#status").text("loading tweets");
	$("#loader").show();

	_pageId = 0;
	_loadedCount = 0;

	//get profile img
	var url = "http://api.twitter.com/1/users/lookup.json?screen_name=" + _screenName + "&callback=?";
	$.getJSON(url, function(data) {
		$("#profile_img").show();
		$("img#profile_img").attr("src", data[0]["profile_image_url"]);
	});

	getTweetPage();

}

function getTweetPage() {

	var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + _screenName + "&count=100" + ((_maxId === undefined) ? "" :  ("&max_id=" + _maxId)) + "&include_rts=" + !_hideRetweets + "&exclude_replies=" + _hideReplies + "&trim_user=true&include_entities=false&suppress_response_codes=true&callback=?";

	$.ajax({
		url: url,
		dataType: 'json',
		success: function(data) {
			if(data.error) {
				console.log("ERROR: " + data.error);
				$("#status").text(data.error);
				$("#loader").hide();
				return;
			}

			//ignore duplicate first item when using max_id
			if (data.length > 0 && data[0].id == _maxId){
				data.shift();
			}

			//render tweets
			$.each(data, function(i, item) {
				//save maxId
				_maxId = item.id;
				$("#tweets ul").append("<li>" + item.text.linkify() + " <span class='created_at'>" + format_time(item.created_at) + "</span> <a target='_blank' href='https://twitter.com/#!/" + _screenName + "/status/" + item.id_str + "'><img src='css/extlink.png'></img></a></li>");
			});

			if(data.length > 1) {
				_loadedCount += data.length;
				getTweetPage();
				$("#status").text("loaded " + _loadedCount + " tweets");
			} else {
				//done
				$("#loader").hide();
			}
		}
	});
}

String.prototype.linkify = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {
		return m.link(m);
	});
};

function format_time(time_value) {
	var values = time_value.split(" ");
	time_value = values[1] + " " + values[2] + ", " + values[5];
	return time_value;
}

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}