bootstrap-table-examples
======================

[Bootstrap Table Examples](http://issues.wenzhixin.net.cn/bootstrap-table)

## Usage

clone & init

```
git clone git@github.com:wenzhixin/bootstrap-table-examples.git
git submodule update --init
```

build

```
node examples-list
```

## Notes

Because the API: `/examples/bootstrap_table/data` is base on node server with the code: https://github.com/wenzhixin/blog/blob/master/routes/examples.js. 

You need to do:

* write a same server code
* or use this example: http://issues.wenzhixin.net.cn/bootstrap-table/#152.html
* or set -disable-web-security to the browser(for example chrome) to support cross domain
* or use web server to add an http proxy(for example nginx)
