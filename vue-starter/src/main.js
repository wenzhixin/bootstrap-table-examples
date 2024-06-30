import { createApp } from 'vue'
import App from './App.vue'

import './plugins/table'
import BootstrapTable from 'bootstrap-table/dist/bootstrap-table-vue'

const app = createApp(App)

app.component('BootstrapTable', BootstrapTable)
app.mount('#app')
