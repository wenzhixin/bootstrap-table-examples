<template>
  <div>
    <BootstrapTable
      ref="table"
      :columns="columns"
      :data="data"
      :options="options"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  {
    field: 'state',
    checkbox: true
  },
  {
    title: 'Item ID',
    field: 'id'
  },
  {
    field: 'name',
    title: 'Item Name'
  },
  {
    field: 'price',
    title: 'Item Price'
  },
  {
    field: 'actions',
    title: 'Actions',
    align: 'center',
    formatter: () => '<button class="btn btn-primary">Click</button>',
    events: {
      'click .btn-primary': (e, index, row) => {
        alert(JSON.stringify(row))
      }
    }
  }
]

const data = ref({
  total: 5,
  rows: [
    {
      id: 1,
      name: 'Item 1',
      price: '$1'
    },
    {
      id: 2,
      name: 'Item 2',
      price: '$2'
    },
    {
      id: 3,
      name: 'Item 3',
      price: '$3'
    },
    {
      id: 4,
      name: 'Item 4',
      price: '$4'
    },
    {
      id: 5,
      name: 'Item 5',
      price: '$5'
    }
  ]
})

const options = ref({
  search: true,
  showColumns: true,
  showExport: true
})
</script>
