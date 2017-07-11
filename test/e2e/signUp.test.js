// // in e2e/tests/login.js
// const webdriver = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver');

// const By = webdriver.By;
// const until = webdriver.until;

// chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// const driver = new webdriver.Builder()
//                  .withCapabilities(webdriver.Capabilities.chrome())
//                  .build();

// describe('sign up form', function () {
//     // e2e tests are too slow for default Mocha timeout
//   this.timeout(10000);

//   before((done) => {
//     driver.navigate().to('http://localhost:8080/user/create')
//         .then(() => done());
//   });

//   it('signup a user', (done) => {
//     driver.findElement(By.xpath('//*[@id="app"]/div/div/form/div[1]/div/input')).sendKeys('newuser');
//     driver.findElement(By.xpath('//*[@id="app"]/div/div/form/div[2]/div/input')).sendKeys('newuser@new.com');
//     driver.findElement(By.xpath('//*[@id="app"]/div/div/form/div[3]/div/input')).sendKeys('new');
//     driver.findElement(By.css('.btn-primary')).click()
//         .then(() => done());
//   });

//   after((done) => {
//     driver.quit()
//         .then(() => done());
//   });
// });
