# vuejs_cloud_tag

In this project based on some rules filter the transaction and show in details screen, when hover on any item show the total number of items mathed based on rule definded 
ex : rule = [{
        "ruleMatchValue" : String,
        "ruleMatchType" : "contains" ,
        "ruleFlag" : "Yellow" ,
        "ruleCategory" : "Loans"  
      }]
      and 
      transaction = [{ "transactionId" :  "3822888e-5f7e-4ae2-a723-06b5238cbf3a" ,
      "transactionDate" :  "Fri Dec 09 2016 11:30:26 GMT+0100 (CET)" ,
      "transactionType" :  "deposit" ,
      "transactionDescription" :  "XYZ  Loan  repayment"
      }]
      
      grouping are by ruleMacthType and ruleCategory 
      
      ruleMatchType might be one of exact , contains , startsWith , endsWith and regex.
      
      after match on click of any item show the relevant items , on hover of relavent item show the count in detail screen and on click       of item list all transcation details.

To generate the Cloud Tags i used a vue component which is available in https://github.com/nobalmohan/vue-tag-cloud though i used a public vue componet its not straight forward so i modified as i want for this project.

for functinal testing i used nightWatch.js and jest for unit test cases as am not aware of unit test cases for front end i managed to learn and added some cases may be i missed some test cases.
Show words with random size and random color and when select any one word fetch respective transactions done based on some rules 

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
