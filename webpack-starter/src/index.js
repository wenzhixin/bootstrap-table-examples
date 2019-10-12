import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'

import $ from 'jquery'
import 'bootstrap'
import 'bootstrap-table' // dist/bootstrap-table.min.js by default

$('#table').bootstrapTable({
  search: true,
  showColumns: true,
  columns: [{
    field: 'id',
    title: 'Item ID'
  }, {
    field: 'name',
    title: 'Item Name'
  }, {
    field: 'price',
    title: 'Item Price'
  }],
  data: [{
    id: 1,
    name: 'Item 2',
    price: '$2'
  }, {
    id: 2,
    name: 'Item 2',
    price: '$2'
  }]
})
