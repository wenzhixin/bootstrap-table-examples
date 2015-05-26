var fs = require('fs'),
    sprintf = require('sprintf');

if (process.argv.length < 3) {
    console.log('You need to enter title');
    return;
}

var content = fs.readFileSync('./template.html').toString(),
    issue = process.argv[2],
    title = process.argv[3] || '';

content = sprintf(content, {
    issue: issue,
    title: title
});

fs.writeFileSync(sprintf('./%s.html', issue), content);
