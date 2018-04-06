import Vue from 'vue'
import TransactionView from '@/components/TransactionView/TransactionView.vue'
import filter from 'lodash/filter'
import rulesArray from '@/data/rules'
import transactions from '@/data/transactions'
import { shallow, mount } from '@vue/test-utils'
import cj from 'circular-json'
import stubVueTagCmp from '@/components/stubVueTagCmp'
  const rule =  {
    "ruleMatchValue": "Interest",
    "ruleMatchType": "contains",
    "ruleFlag": "Yellow",
    "ruleCategory": "Interest"
  }
  const wrapper = shallow(TransactionView, {
    mocks: {
      rule
    }
  })
  const stubCmp = shallow(HelloWorld, {
    propsData: {
      data: rulesArray
    }
   })
   describe('TransactionView.vue', () => {
    it('has a created before mount hook', () => {
      expect(typeof TransactionView.beforeMount).toBe('function')
    })
    it('sets the correct default data', () => {
      expect(typeof TransactionView.data).toBe('function')
      const defaultData = TransactionView.data()  
      expect(defaultData.isMainPage).toBeTruthy()    
      expect(defaultData.resultSet.length).toEqual(0)
      expect(defaultData.isDetailPageActive).toBeFalsy()
      expect(defaultData.displayLengthOnHover).toBeFalsy()
      expect(defaultData.text).toEqual('TRANSACTION HISTORY - BY CATEGORY')
    })
    it('list whcih contains elements in rules array', () => {
      expect(typeof TransactionView.data).toBe('function')
      expect(wrapper.vm.lists.length).toEqual(rulesArray.length);        
      expect(rulesArray).toEqual(expect.arrayContaining(wrapper.vm.lists));
    })
    it('has a created hook', () => {
      TransactionView.methods.onBackPress
      console.log('@@@@@@@@@@@@@@'+cj.stringify(wrapper.vm))
      expect(TransactionView.methods.onBackPress).toBeTruthy()
    })
    it('onmouseover triggered event', () => {
      stubCmp.find('#child').trigger('mouseover')
      const emittedEvent = stubCmp.emitted('onmouseover')
      expect(stubCmp.emitted().onmouseover).toBeTruthy()
      })
     it('onmouseclick triggered event', () => {
        stubCmp.find('#child').trigger('click')
        const emittedEvent = stubCmp.emitted('onmouseclick')
        expect(stubCmp.emitted().onmouseclick).toBeTruthy()
      })
    })