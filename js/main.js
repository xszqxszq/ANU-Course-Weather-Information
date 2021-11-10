var windMap = {
	"%E5%8C%97%E9%A3%8E": "North",
	"%E5%8D%97%E9%A3%8E": "South",
	"%E8%A5%BF%E9%A3%8E": "West",
	"%E4%B8%9C%E9%A3%8E": "East",
	"%E8%A5%BF%E5%8C%97%E9%A3%8E": "Northwest",
	"%E4%B8%9C%E5%8C%97%E9%A3%8E": "Northeast",
	"%E4%B8%9C%E5%8D%97%E9%A3%8E": "Southeast",
	"%E8%A5%BF%E5%8D%97%E9%A3%8E": "Southwest"
}
var airLevelMap = {
	"%E4%BC%98": "Good",
	"%E8%89%AF": "Moderate",
	"%E8%BD%BB%E5%BA%A6%E6%B1%A1%E6%9F%93": "Unhealthy",
	"%E4%B8%AD%E5%BA%A6%E6%B1%A1%E6%9F%93": "Unhealthy",
	"%E9%87%8D%E5%BA%A6%E6%B1%A1%E6%9F%93": "Very Unhealthy",
	"%E4%B8%A5%E9%87%8D%E6%B1%A1%E6%9F%93": "Hazardous"
}
var weatherIconMap = {
	"xue": "fas fa-snowflake",
	"lei": "fas fa-bolt",
	"shachen": "fas fa-wind",
	"wu": "fas fa-smog",
	"bingbao": "fas fa-cloud-meatball",
	"yun": "fas fa-cloud",
	"yu": "fas fa-umbrella",
	"yin": "fas fa-cloud-sun",
	"qing": "fas fa-sun"
}
function wearingTips(tem) {
	if (tem < 0) {
		return "Air is freezing! Wear heavy clothes!";
	} else if (tem < 10) {
		return "It's kinda cold outside. More clothes!"
	} else if (tem < 25) {
		return "Weather is moderate. Wear as you like!";
	} else {
		return "Air is boiling! T-shirt is ok!"
	}
}
function umbrellaTips(status) {
	if (status == "qing" || status == "wu" || status == "shachen") {
		return "Umbrella is not needed!";
	} else if (status == "yu" || status == "xue" || status == "lei" || status == "bingbao") {
		return "Please bring your umbrella!";
	} else {
		return "You might need an umbrella.";
	}
}
function trafficTips(status) {
	if (status == "yu" || status == "xue" || status == "lei" || status == "bingbao") {
		return "Depart earlier to avoid traffic jam!";
	} else {
		return "Traffic situation might be ok!";
	}
}
$(document).ready(function(){
	$.get("https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=39822947&appsecret=B1EINrhx&city=%E5%A8%81%E6%B5%B7", function(data, status) {
		$("#location").text(data.cityEn + ", " + data.countryEn)
		$("#now-weather").html("<i class='" + weatherIconMap[data.wea_img] + "'>")
		$("#now-tem").html(data.tem + "&deg;C");
		$("#now-tem-range").html("<span class='badge'>" + data.tem2 + "&deg;C~" + data.tem1 + "&deg;C" + "</span>");
		$("#now-wind").html("<i class='fas fa-wind'></i> " + windMap[encodeURI(data.win)] + ", " + data.win_meter);
		$("#now-humidity").html("<i class='fas fa-tint'></i> " + data.humidity);
		$("#now-air").html("<i class='fas fa-air-freshener'></i> Air quality is " + airLevelMap[encodeURI(data.aqi.air_level)]);
		$("#clothing").html("<i class='fas fa-tshirt'></i> " + wearingTips(data.tem2));
		$("#umbrella").html("<i class='fas fa-umbrella'></i> " + umbrellaTips(data.wea_img));
		$("#traffic").html("<i class='fas fa-car'></i> " + trafficTips(data.wea_img));
	})
});