<template>
  <BootstrapTable :columns="columns" :data="data" :options="options"></BootstrapTable>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: 'Item ID',
          field: 'id'
        },
        {
          field: 'name',
          title: 'Item Name'
        }, {
          field: 'price',
          title: 'Item Price'
        }
      ],
      data: [
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
      ],
      options: {
        search: true,
        showColumns: true
      }
    }
  }
}
</script>
