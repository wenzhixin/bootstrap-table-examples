var fs = require('fs'),
    baseUrl = 'http://issues.wenzhixin.net.cn/bootstrap-table/';

fs.readdir('.', function (err, list) {
    if (err) {
        console.log(err);
        return;
    }
    var content = fs.readFileSync('./index.html.conf').toString(),
        html = [];

    list.sort().forEach(function (file) {
        if (/^\d+.html$/.test(file)) {
            var content = fs.readFileSync(file).toString(),
                m = content.match(/<title>(.*)<\/title>/);

            if (m) {
                html.push('<li>' + file.split('.')[0] + '. <a href="' + file + '">' + m[1] + '</a></li>');
            }
        }
    });
    fs.writeFileSync('./index.html', content.replace('@@list@@', html.join('\n')));
});
