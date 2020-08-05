const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const readmeBox = require('readme-box').ReadmeBox;

(async () => {
    try {
        const githubToken = core.getInput('github-token');
        const filePath = core.getInput('json-file-path');
        const content = fs.readFileSync(path.join(process.env.GITHUB_WORKSPACE, filePath));
        const json = JSON.parse(content);
        console.log(json); // @TODO: debug

        const oldContent = fs.readFileSync(path.join(process.env.GITHUB_WORKSPACE, filePath), 'utf8');
        const box = new ReadmeBox();
        box.replaceSection({
            section: 'data-section',
            oldContent,
            newContent: content,
            token: githubToken
        });

        const time = new Date().toTimeString();
        core.setOutput('time', time);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
