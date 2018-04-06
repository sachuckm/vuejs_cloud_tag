import rules from '@/data/rules.json'
import transactions from '@/data/transactions.json'
import detailPage from '@/components/detailPage/detailPage.vue'
import VueTagCloud from '@/components/VueTagCloud.vue'
import filter from 'lodash/filter'
import isRegExp from 'lodash/isRegExp'
import shuffle from 'lodash/shuffle'
import toLower from 'lodash/toLower'
import startsWith from 'lodash/startsWith'
import endsWith from 'lodash/endsWith'

export default {
  components: {
    'detail-page': detailPage,
    VueTagCloud
  },
  computed: {
    rules () {
      return this.lists
    }
  },
  data () {
    return {
      lists: [],
      resultSet: [],
      isMainPage: true,
      isDetailPageActive: false,            
      displayLengthOnHover: false,
      text: 'TRANSACTION HISTORY - BY CATEGORY'
    }
  },
  methods: {
    onmouseclick (rule) {
      if (this.isMainPage) {
        this.isDetailPageActive = true
        this.lists = filter(rules, {ruleFlag: (rule.ruleFlag)})
        this.isMainPage = false     
        this.text = 'TRANSACTION HISTORY - BY MATCH'
      }
        this.displayLengthOnHover = false
    },
   onBackPress () {
      this.isMainPage = true
      this.isDetailPageActive = false
      this.resultSet = []
      this.lists = rules
      this.text = 'TRANSACTION HISTORY - BY CATEGORY'
    },
    onmouseover (rule) {
      
      if (!this.isMainPage) {
        this.filterTransactions(rule)
      }      
    },
    filterTransactions(rule) {
      switch (rule.ruleMatchType) {
        case 'contains' :
          this.resultSet = transactions.filter((transaction) => {
            if (transaction && transaction.transactionDescription && rule && rule.ruleMatchValue && toLower(transaction.transactionDescription).indexOf(toLower(rule.ruleMatchValue)) !== -1) {
              return transaction.transactionDescription
            }
          })
          this.displayLengthOnHover = true
          break
        case 'endsWith':
        this.resultSet = transactions.filter((transaction) => {
          if (transaction && transaction.transactionDescription && rule && rule.ruleMatchValue && endsWith(toLower(transaction.transactionDescription) , (toLower(rule.ruleMatchValue))) === true) {
            return transaction.transactionDescription
          }
        })
          break
        case 'startsWith':
        this.resultSet = transactions.filter((transaction) => {
          if (transaction && transaction.transactionDescription && rule && rule.ruleMatchValue && startsWith(toLower(transaction.transactionDescription) , (toLower(rule.ruleMatchValue))) === true) {
            return transaction.transactionDescription
          }
        })
        case 'regex':
        this.resultSet = transactions.filter((transaction) => {
          if (transaction && transaction.transactionDescription && rule && rule.ruleMatchValue && toLower(transaction.transactionDescription).match(rule.ruleMatchValue).length > 0) {
            return transaction.transactionDescription
          }
        })
        case 'exact':
        this.resultSet = transactions.filter((transaction) => {
          if (transaction && transaction.transactionDescription && rule && rule.ruleMatchValue && toLower(transaction.transactionDescription) === toLower(rule.ruleMatchValue).length) {
            return transaction.transactionDescription
          }
        })
          break
          default:
          this.resultSet = []
      }
    },
  },
  beforeMount: function () {
    this.lists = rules
  }
}
