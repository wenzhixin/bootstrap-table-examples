var fs = require('fs'),
    sprintf = require('sprintf');

if (process.argv.length <= 2) {
    console.log('You need to enter title');
    return;
}

var content = fs.readFileSync('./template.html').toString(),
    title = process.argv[2];

content = sprintf(content, {
    title: title
});

fs.writeFileSync(sprintf('./%s.html', title.replace(/\//g, '-')), content);
