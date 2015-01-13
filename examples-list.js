var fs = require('fs'),
    baseUrl = 'http://issues.wenzhixin.net.cn/bootstrap-table/';

fs.readdir('.', function (err, list) {
    if (err) {
        console.log(err);
        return;
    }
    var markdown = [fs.readFileSync('./README.conf').toString()];

    list.forEach(function (file) {
        if (/^\d+.html$/.test(file)) {
            var content = fs.readFileSync(file).toString(),
                m = content.match(/<title>(.*)<\/title>/);

            if (m) {
                markdown.push('* ' + file.split('.')[0] + '. [' + m[1] + '](' + baseUrl + file + ')');
            }
        }
    });
    fs.writeFileSync('./README.md', markdown.join('\n'));
});