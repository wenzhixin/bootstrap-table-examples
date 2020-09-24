<template>
  <div>
    <BootstrapTable
      ref="table"
      :columns="columns"
      :data="data"
      :options="options"
      @on-post-body="vueFormatterPostBody"
    />
  </div>
</template>

<script>
import tableMixin from '../mixins/table'

export default {
  mixins: [tableMixin],
  data () {
    return {
      columns: [
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
          formatter: (value, row) => {
            return this.vueFormatter({
              template: '<b-button @click="clickRow(row)">Click</b-button>',
              data: { row },
              methods: {
                clickRow: this.clickRow
              }
            })
          }
        }
      ],
      data: {
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
      },
      options: {
        search: true,
        showColumns: true,
        showExport: true
      }
    }
  },
  methods: {
    clickRow (row) {
      alert(JSON.stringify(row))
    }
  }
}
</script>
