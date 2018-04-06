import Vue from 'vue'
import detailPage from '@/components/detailPage/detailPage.vue'
import filter from 'lodash/filter'
import toLower from 'lodash/toLower'
import rulesArray from '@/data/rules'
import transactions from '@/data/transactions'
import { shallow, mount } from '@vue/test-utils'
  const ruleToTest =  {
    "ruleMatchValue": "Interest",
    "ruleMatchType": "contains",
    "ruleFlag": "Yellow",
    "ruleCategory": "Interest"
  }
  const createCmp = propsData => mount(detailPage, { propsData })
  const lists = transactions.filter((transactions) => {
    if (transactions && transactions.transactionDescription && ruleToTest && ruleToTest.ruleMatchValue && toLower(transactions.transactionDescription).indexOf(toLower(ruleToTest.ruleMatchValue)) !== -1) {
      return transactions.transactionDescription
    }
  })
    const wrapper = shallow(detailPage, {
      propsData: {
      displayLengthOnHover: 'true',
      lists:lists
     }
   })
  describe('TransactionView.vue', () => {
    it('test props value', () => {
      expect(Array.isArray(wrapper.vm.lists)).toBe(true)
      expect(wrapper.vm.lists.length).toEqual(lists.length)
      expect(transactions).toEqual(expect.arrayContaining(wrapper.vm.lists))
    //expect(wrapper.vm.lists.displayLengthOnHover).toBeTruthy() 
  })
})
