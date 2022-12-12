# bootstrap-table-examples

[Bootstrap Table Docs](https://bootstrap-table.com/)

[Bootstrap Table Examples](https://examples.bootstrap-table.com)

[jsFiddle Examples](https://github.com/wenzhixin/bootstrap-table-examples/blob/master/jsfiddle_examples.md)

[CRUD Example](https://github.com/wenzhixin/bootstrap-table-examples/blob/master/crud/README.md)

## Local develop

To develop bootstrap-table and bootstrap-table-examples locally please run:

```bash
mkdir bootstrap-table-dev
cd bootstrap-table-dev
git clone https://github.com/wenzhixin/bootstrap-table
git clone https://github.com/wenzhixin/bootstrap-table-examples

cd bootstrap-table
yarn && yarn css:build:src

cd ..
yarn add http-server
npx http-server
```

And then open: http://localhost:8081/bootstrap-table-examples

## Local server

```bash
cd bootstrap-table-examples
yarn
cd server
node app.js
```

## reporting issues

All issues need to be submitted to the main project, not this examples repo.

Please read: [CONTRIBUTING.md#bug-reports](https://github.com/wenzhixin/bootstrap-table/blob/develop/CONTRIBUTING.md#bug-reports) and post issue to [issue](https://github.com/wenzhixin/bootstrap-table/issues), thanks!
