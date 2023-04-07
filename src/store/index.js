import Vue from 'vue'
import Vuex from 'vuex'
import client from '@/store/client'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        client
    }
})
