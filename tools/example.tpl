<script>
  init({
    title: '@title@',
    desc: '@desc@',
    links: ['bootstrap-table.min.css'],
    scripts: ['bootstrap-table.min.js']
  })
</script>

<table
  id="table"
  data-toggle="table"
  data-height="460"
  data-url="@url@"@attrs@>
  <thead>
    <tr>
      <th data-field="id">ID</th>
      <th data-field="name">Item Name</th>
      <th data-field="price">Item Price</th>
    </tr>
  </thead>
</table>

<script>
  var $table = $('#table')

  function mounted() {

  }
</script>
