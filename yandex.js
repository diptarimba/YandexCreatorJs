const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const fs = require('fs');
const humanDelay = async (time) => new Promise(resolve=>setTimeout(resolve,time*(1+Math.random())))
const timeout = millis => new Promise(resolve => setTimeout(resolve, millis))
const open = require('open');

const options = { waitUntil: 'networkidle2', timeout: 120000 };

async function processLineByLine() {
	
	var looper = readlineSync.question('Mau Berapa Kali : ');
	for (let i = 1; i <= looper; i++) {
		console.log("[+] Putaran Ke - " + i);
		await run();
	}
}

async function run () {
	
		try {
			
			var tgl = random(1,28).toString();
			var thn = random(1985,2001).toString();
			var bln = random(1,12).toString();
			
			var nama = genuser();
			var username = nama[0];
			var namadepan = nama[1];
			var namabelakang = nama[2];
			var password = "KadalGurun11224";
			var hintAnswer = nama[1].substr(0,3) + makeid(5);
			var saveData = '';
			var browser = await puppeteer.launch({
				headless: true,
				defaultViewport: null,
					args: [ '--disable-features=IsolateOrigins,site-per-process',
							'--disable-web-security',
							'--flag-switches-begin --disable-site-isolation-trials --flag-switches-end'		
							],
				ignoreHTTPSErrors: true,
				slowMo:10,
			});
			
			const page = await browser.newPage();
			
			
			await page.goto('https://passport.yandex.com/registration', options).catch(function(err) {
				if (err) throw "Kelamaan Load";
			});
			
			await page.type('#firstname', namadepan);
			await humanDelay(2000);
			await page.type ('#lastname', namabelakang);
			await humanDelay(2000);
			await page.type ('#login', username);
			await humanDelay(2000);
			await page.type ('#password', password);
			await humanDelay(2000);
			await page.type ('#password_confirm', password);
			await humanDelay(2000);
			await page.click('#root > div > div.grid > div > main > div > div > div > form > div.human-confirmation-wrapper.can-switch > div > div:nth-child(2) > div > div.toggle-link.link_has-no-phone > span')
			await humanDelay(2000);
			await page.type('#hint_answer', hintAnswer);
			await humanDelay(2000);
			await page.click('#root > div > div.grid > div > main > div > div > div > form > div.human-confirmation-wrapper.can-switch > div > div.captcha-wrapper > div.form__field.registration__captcha > div > div.captcha__footer.clearfix > div');
			await humanDelay(2000);

			const element = await page.$('#root > div > div.grid > div > main > div > div > div > form > div.human-confirmation-wrapper.can-switch > div > div.captcha-wrapper > div.form__field.registration__captcha > div');      
			await element.screenshot({path: 'captcha.jpg'});
			await open('captcha.jpg', {wait: true});
			
			var capcay = readlineSync.question('Tulis disini captcha yang lu baca tod : ');
			
			await page.type('#captcha', capcay);
			await humanDelay(2000);
			
			await page.click('#root > div > div.grid > div > main > div > div > div > form > div.form__submit > span > button');
			await humanDelay(2000);
			await page.click('#keep_unsubscribed');
			await humanDelay(2000);
			await Promise.all([
				page.click('#root > div > div.grid > div > main > div > div > div > form > div.form__submit > div > div.eula-popup > div > button'),
				page.waitForNavigation(options)
				.catch(function(err) {
					if (err) throw "Kelamaan Load";
				}),
			])
			
			var captcha_salah = await page.$x("//div[contains(text(), 'You entered the wrong characters. Try again.')]");
			if(captcha_salah.length > 0){
				console.log("Captcha Salah!");
				return;
			}
			
			await humanDelay(3000);
			
			if(page.url() !== 'https://passport.yandex.com/registration'){
				
				console.log("akun sudah jadi");
				
				fs.appendFile("YandexJadi.csv", username + "@yandex.com;KadalGurun11224;\n", function(err) {
					if (err) throw err;
				});
			}
			
			
			
			
		} catch (e){
				console.log(e)
				return;
		}	finally {
				await browser.close();
		}
		
	
}


processLineByLine()

function genuser(){
	
	var random_name = require('node-random-name');
	var namdep = random_name({ first: true });
	var nambal = random_name({ last: true });
	var username = [
		namdep + nambal + random(100,9999),
		nambal + namdep + random(100,9999),
		nambal + makeid(random(4,6)),
		namdep + makeid(random(4,6))
	];
	
	var angka_return = random(0,username.length);
	return [ username[angka_return],namdep,nambal ];
}

function random(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
