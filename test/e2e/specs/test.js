// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
var rules = require("../../../src/data/rules.json");
var transactions = require("../../../src/data/transactions.json");
var lodash = require('lodash');

const ruleToTest = {
  "ruleMatchValue": "Interest",
  "ruleMatchType": "contains",
  "ruleFlag": "Yellow",
  "ruleCategory": "Interest"
  }
const filteredLists = lodash.filter(rules, {ruleFlag: (ruleToTest.ruleFlag)})
const resultSet = transactions.filter((transactions) => {
  if (transactions && transactions.transactionDescription && ruleToTest && ruleToTest.ruleMatchValue && lodash.toLower(transactions.transactionDescription).indexOf(lodash.toLower(ruleToTest.ruleMatchValue)) !== -1) {
    return transactions.transactionDescription
  }
})
module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.lists')
      .assert.elementPresent('.header')
      .assert.elementPresent('#vue-tag-cloud')
      .assert.containsText('h1', 'TRANSACTION HISTORY - BY CATEGORY')
      .assert.checkRulesSize(rules)
      .end()
  },
  'click on a rule': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
    .url(devServer)
      .waitForElementVisible('#app', 5000)
    .click('.'+ruleToTest.ruleMatchValue)
    .pause(1000)
    .assert.checkRulesSize(filteredLists)
    .assert.containsText('h1', 'TRANSACTION HISTORY - BY MATCH')
    .assert.elementPresent('.backImage')
    .assert.elementPresent('.backButton')
    .end()
  },
  'mouse  over on a element to test detail page is present and and to check the length': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
    .url(devServer)
      .waitForElementVisible('#app', 5000)
    .click('.'+ruleToTest.ruleMatchValue)
    .pause(3000)
    .moveTo('.'+ruleToTest.ruleMatchValue, null, null, function(){
      browser.pause(3000)
  })
  .assert.elementPresent('.detail-lists')
  .assert.elementPresent('.detailPage')
    .end()
  },
  'Test Details screen': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
    .url(devServer)
    .waitForElementVisible('#app', 5000)
    .click('.'+ruleToTest.ruleMatchValue)
    .pause(3000)
    .moveTo('.'+ruleToTest.ruleMatchValue, null, null, function(){
      browser.pause(3000)
  })
  .assert.containsText('h1', 'TRANSACTION HISTORY - BY MATCH')  
  .assert.elementPresent('.detail-lists')
  .assert.elementPresent('.detailPage')
  .assert.checkRulesSize(resultSet)
  .end()
  }
}
