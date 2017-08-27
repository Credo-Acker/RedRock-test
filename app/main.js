const less = require('less');
const web = require('./styles/web.less');

window.onload = function () {
	let weather = document.querySelector('#weather'),
		monthDay = document.querySelector('.month-day'),
		weekday = document.querySelector('.weekday'),
		nongli = document.querySelector('.nongli'),
		dayCondition1 = document.querySelector('.day-condition1'),
		dayCondition2 = document.querySelector('.day-condition2'),
		boss = document.querySelector('.boss');

	boss.addEventListener('click', function () {
		let boss1 = document.querySelector('.boss-left'),
			boss2 = document.querySelector('.boss-right');

		let boss1N = boss1.className,
			boss2N = boss2.className;
		boss1.className = boss1N + ' ' + 'boss1';
		boss2.className = boss2N + ' ' + 'boss2';

		setTimeout(function () {
			let bossN = boss.className;
			boss.className =  bossN + ' ' + 'boss-click';
		}, 1000);
	});

	date();
	initCanvas();

	//ajax获取数据库天气
	ajax({
		methor: "get",
		url: "/forecast",
		asyn: true,
		success: function (data) {
			let Data = JSON.parse(data);
			let lis = dayCondition2.querySelectorAll('li');
			for (var i = 0; i < lis.length; i++) {
				lis[i].innerHTML = Data[i].weather;
			}
		}
	});

	function date() {
		let myDate = new Date();
		let lis = dayCondition1.querySelectorAll('li');
		let month = (myDate.getMonth() + 1) > 10 ? (myDate.getMonth() + 1) : ("0" + (myDate.getMonth() + 1)),
		    day = myDate.getDay();
		switch (day) {
			case 0:
				day = "星期日";
				lis[1].querySelector('span').innerHTML = "星期日";
				lis[2].querySelector('span').innerHTML = "星期一";
				lis[3].querySelector('span').innerHTML = "星期二";
				lis[4].querySelector('span').innerHTML = "星期三";
				lis[5].querySelector('span').innerHTML = "星期四";
				lis[6].querySelector('span').innerHTML = "星期五";
				break;
			case 1:
				day = "星期一";
				lis[1].querySelector('span').innerHTML = "星期一";
				lis[2].querySelector('span').innerHTML = "星期二";
				lis[3].querySelector('span').innerHTML = "星期三";
				lis[4].querySelector('span').innerHTML = "星期四";
				lis[5].querySelector('span').innerHTML = "星期五";
				lis[6].querySelector('span').innerHTML = "星期六";
				break;
			case 2:
				day = "星期二";
				lis[1].querySelector('span').innerHTML = "星期二";
				lis[2].querySelector('span').innerHTML = "星期三";
				lis[3].querySelector('span').innerHTML = "星期四";
				lis[4].querySelector('span').innerHTML = "星期五";
				lis[5].querySelector('span').innerHTML = "星期六";
				lis[6].querySelector('span').innerHTML = "星期六日";
				break;
			case 3:
				day = "星期三";
				lis[1].querySelector('span').innerHTML = "星期三";
				lis[2].querySelector('span').innerHTML = "星期四";
				lis[3].querySelector('span').innerHTML = "星期五";
				lis[4].querySelector('span').innerHTML = "星期六";
				lis[5].querySelector('span').innerHTML = "星期日";
				lis[6].querySelector('span').innerHTML = "星期一";
				break;
			case 4:
				day = "星期四";
				lis[1].querySelector('span').innerHTML = "星期四";
				lis[2].querySelector('span').innerHTML = "星期五";
				lis[3].querySelector('span').innerHTML = "星期六";
				lis[4].querySelector('span').innerHTML = "星期日";
				lis[5].querySelector('span').innerHTML = "星期一";
				lis[6].querySelector('span').innerHTML = "星期二";
				break;
			case 5:
				day = "星期五";
				lis[1].querySelector('span').innerHTML = "星期五";
				lis[2].querySelector('span').innerHTML = "星期六";
				lis[3].querySelector('span').innerHTML = "星期日";
				lis[4].querySelector('span').innerHTML = "星期一";
				lis[5].querySelector('span').innerHTML = "星期二";
				lis[6].querySelector('span').innerHTML = "星期三";
				break;
			case 6:
				day = "星期六";
				lis[1].querySelector('span').innerHTML = "星期六";
				lis[2].querySelector('span').innerHTML = "星期日";
				lis[3].querySelector('span').innerHTML = "星期一";
				lis[4].querySelector('span').innerHTML = "星期二";
				lis[5].querySelector('span').innerHTML = "星期三";
				lis[6].querySelector('span').innerHTML = "星期四";
				break;
			default: break;
		}
		monthDay.innerHTML = month + "月" + myDate.getDate() + "日";
		weekday.innerHTML = day;
	}

	function initCanvas() {
		let winwidth = window.document.documentElement.getBoundingClientRect().width;
		let canvas = document.querySelector('#canvas');
		if (winwidth > 640) {
			winwidth = 640;
		}
		canvas.width = winwidth;
		canvas.height = winwidth / 2;
		let cxt = canvas.getContext('2d');

		cxt.beginPath();
		cxt.moveTo(canvas.width / 21, canvas.height / 21);
		cxt.lineTo(canvas.width / 21, canvas.height / 21 * 20);
		cxt.lineTo(canvas.width / 21 * 20, canvas.height / 21 * 20);
		cxt.stroke();
		cxt.closePath();

		cxt.beginPath();		//画箭头1
		cxt.moveTo(canvas.width / 21, canvas.height / 21);
		cxt.lineTo(canvas.width / 21 - 10, canvas.height / 21 + 15);
		cxt.stroke();
		cxt.closePath();

		cxt.beginPath();		//画箭头2
		cxt.moveTo(canvas.width / 21, canvas.height / 21);
		cxt.lineTo(canvas.width / 21 + 10, canvas.height / 21 + 15);
		cxt.stroke();
		cxt.closePath();

		cxt.beginPath();		//画箭头3
		cxt.lineTo(canvas.width / 21 * 20, canvas.height / 21 * 20);
		cxt.lineTo(canvas.width / 21 * 20 - 15, canvas.height / 21 * 20 + 10);
		cxt.stroke();
		cxt.closePath();

		cxt.beginPath();		//画箭头4
		cxt.lineTo(canvas.width / 21 * 20, canvas.height / 21 * 20);
		cxt.lineTo(canvas.width / 21 * 20 - 15, canvas.height / 21 * 20 - 10);
		cxt.stroke();
		cxt.closePath();

		ajax({
			methor: "get",
			url: "/forecast",
			asyn: true,
			success: function (data) {
				let Data = JSON.parse(data);
				h1 = Math.ceil((Data[0].max_temp + Data[0].min_temp) / 2);
				h2 = Math.ceil((Data[1].max_temp + Data[1].min_temp) / 2);
				h3 = Math.ceil((Data[2].max_temp + Data[2].min_temp) / 2);
				h4 = Math.ceil((Data[3].max_temp + Data[3].min_temp) / 2);
				h5 = Math.ceil((Data[4].max_temp + Data[4].min_temp) / 2);
				h6 = Math.ceil((Data[5].max_temp + Data[5].min_temp) / 2);
				h7 = Math.ceil((Data[6].max_temp + Data[6].min_temp) / 2);

				zhexian();
				dian();
				wendu();
				//画温度折线
				function zhexian() {
					cxt.strokeStyle = "#999";
					cxt.beginPath();
					cxt.moveTo(Math.floor(canvas.width / 14), Math.floor(canvas.height - canvas.height  * h1 / 55));
					cxt.lineTo(Math.floor(canvas.width / 14 * 3), Math.floor(canvas.height - canvas.height  * h2 / 55));
					cxt.lineTo(Math.floor(canvas.width / 14 * 5), Math.floor(canvas.height - canvas.height * h3 / 55));
					cxt.lineTo(Math.floor(canvas.width / 14 * 7), Math.floor(canvas.height - canvas.height * h4 / 55));
					cxt.lineTo(Math.floor(canvas.width / 14 * 9), Math.floor(canvas.height - canvas.height * h5 / 55));
					cxt.lineTo(Math.floor(canvas.width / 14 * 11), Math.floor(canvas.height - canvas.height * h6 / 55));
					cxt.lineTo(Math.floor(canvas.width / 14 * 13), Math.floor(canvas.height - canvas.height * h7 / 55));
					cxt.stroke();
					cxt.closePath();
				}

				//画温度的点
				function dian() {
					cxt.strokeStyle = "#666";
					cxt.beginPath();
					cxt.arc(Math.floor(canvas.width / 14), Math.floor(canvas.height - canvas.height  * h1 / 55), 2, 0, 2 * Math.PI);
					cxt.arc(Math.floor(canvas.width / 14 * 3), Math.floor(canvas.height - canvas.height  * h2 / 55), 2, 0, 2 * Math.PI);
					cxt.arc(Math.floor(canvas.width / 14 * 5), Math.floor(canvas.height - canvas.height * h3 / 55), 2, 0, 2 * Math.PI);
					cxt.arc(Math.floor(canvas.width / 14 * 7), Math.floor(canvas.height - canvas.height * h4 / 55), 2, 0, 2 * Math.PI);
					cxt.arc(Math.floor(canvas.width / 14 * 9), Math.floor(canvas.height - canvas.height * h5 / 55), 2, 0, 2 * Math.PI);
					cxt.arc(Math.floor(canvas.width / 14 * 11), Math.floor(canvas.height - canvas.height * h6 / 55), 2, 0, 2 * Math.PI);
					cxt.arc(Math.floor(canvas.width / 14 * 13), Math.floor(canvas.height - canvas.height * h7 / 55), 2, 0, 2 * Math.PI);
		   			cxt.stroke();
					cxt.closePath();
				}

				//写温度
				function wendu() {
					cxt.font="15px";
					cxt.strokeStyle = "black";
					cxt.beginPath();
					//第一个
				    cxt.strokeText(Data[0].max_temp + "°", Math.floor(canvas.width / 14 - 15), Math.floor(canvas.height - canvas.height  * h1 / 55 - 15 ));
					cxt.strokeText(Data[0].min_temp + "°", Math.floor(canvas.width / 14 - 15), Math.floor(canvas.height - canvas.height  * h1 / 55 + 20 ));
					//第二个
					cxt.strokeText(Data[1].max_temp + "°", Math.floor(canvas.width / 14 * 3 - 15), Math.floor(canvas.height - canvas.height  * h2 / 55 - 15 ));
					cxt.strokeText(Data[1].min_temp + "°", Math.floor(canvas.width / 14 * 3 - 15), Math.floor(canvas.height - canvas.height  * h2 / 55 + 15 ));
					//第三个
					cxt.strokeText(Data[2].max_temp + "°", Math.floor(canvas.width / 14 * 5 - 15), Math.floor(canvas.height - canvas.height  * h3 / 55 - 15 ));
					cxt.strokeText(Data[2].min_temp + "°", Math.floor(canvas.width / 14 * 5 - 15), Math.floor(canvas.height - canvas.height  * h3 / 55 + 20 ));
					//第四个
					cxt.strokeText(Data[3].max_temp + "°", Math.floor(canvas.width / 14 * 7 - 15), Math.floor(canvas.height - canvas.height  * h4 / 55 - 15 ));
					cxt.strokeText(Data[3].min_temp + "°", Math.floor(canvas.width / 14 * 7 - 15), Math.floor(canvas.height - canvas.height  * h4 / 55 + 20 ));
					//第五个
					cxt.strokeText(Data[4].max_temp + "°", Math.floor(canvas.width / 14 * 9 - 15), Math.floor(canvas.height - canvas.height  * h5 / 55 - 15 ));
					cxt.strokeText(Data[4].min_temp + "°", Math.floor(canvas.width / 14 * 9 - 15), Math.floor(canvas.height - canvas.height  * h5 / 55 + 20 ));
					//第六个
					cxt.strokeText(Data[5].max_temp + "°", Math.floor(canvas.width / 14 * 11 - 15), Math.floor(canvas.height - canvas.height  * h6 / 55 - 15 ));
					cxt.strokeText(Data[5].min_temp + "°", Math.floor(canvas.width / 14 * 11 - 15), Math.floor(canvas.height - canvas.height  * h6 / 55 + 20 ));
					//第七个
					cxt.strokeText(Data[6].max_temp + "°", Math.floor(canvas.width / 14 * 13 - 15), Math.floor(canvas.height - canvas.height  * h7 / 55 - 15 ));
					cxt.strokeText(Data[6].min_temp + "°", Math.floor(canvas.width / 14 * 13 - 15), Math.floor(canvas.height - canvas.height  * h7 / 55 + 20 ));
					cxt.closePath();
				}

			}
		});
	}

	function ajax(json) {
	    // 创建ajax对象
	    let xhr = null;
	    let methor = json.methor || 'get';
	    let url = json.url;
	    let asyn = json.asyn ? true : json.asyn == false ? false : true;
	    let data = json.data || '';
	    let success = json.success;
	    let error = json.error;

	    if (window.XMLHttpRequest) {
	        xhr = new XMLHttpRequest();
	    } else {
	        xhr = new ActiveXObject('Microsoft.XMLHTTP')
	    }
	    if (methor.toLowerCase() === 'get'){
	        xhr.open(methor,url,asyn);
	        url += '?' + data + '&' + new Date().getTime();
	    }
	    if (methor.toLowerCase() === 'post') {
	            xhr.open(methor, url, asyn);
	            xhr.setRequestHeader("Content-Type", "application/json");
	    }

	    // 处理返回数据
	    xhr.onreadystatechange = function(){
	        if(xhr.readyState == 4){
	            if(xhr.status == 200){
	                success && success(xhr.responseText);
	            } else {
	                if(error){
	                    error && error();
	                }
	            }
	        }
	    }
	    xhr.send(data);
	};

}
