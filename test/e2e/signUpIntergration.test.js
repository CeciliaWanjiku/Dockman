// in e2e/tests/login.js
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const By = webdriver.By;
const until = webdriver.until;

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var driver = new webdriver.Builder()
                 .withCapabilities(webdriver.Capabilities.chrome())
                 .build();

describe('login form',function (){
    // e2e tests are too slow for default Mocha timeout
  this.timeout(10000);

  before((done) => {
    driver.navigate().to('http://localhost:8090/userLogin')
        .then(() => done());
  });

  it('login a user', (done) => {
    driver.findElement(By.xpath('//*[@id="app"]/div/div/form/div[1]/div/input')).sendKeys('muchai@muchai.com');
    driver.findElement(By.xpath('//*[@id="app"]/div/div/form/div[2]/div/input')).sendKeys('muchai');
    driver.findElement(By.css('.btn-primary')).click()
        .then(() => done());
  });

  after((done) => {
    driver.quit()
        .then(() => done());
  });
});
