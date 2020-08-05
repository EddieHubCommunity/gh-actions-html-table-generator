const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const readmeBox = require('readme-box').ReadmeBox;

(async () => {
    try {
        const filePath = path.join(process.env.GITHUB_WORKSPACE, core.getInput('json-file-path'));
        const data = fs.readFileSync(filePath, 'utf8');
        // const json = JSON.parse(content);

        const oldContent = fs.readFileSync(path.join(process.env.GITHUB_WORKSPACE, 'README.md'), 'utf8');
        const box = new readmeBox();
        const replacedContents = box.replaceSection({
            section: 'data-section',
            oldContent,
            newContent: data
        });

        fs.writeFileSync(filePath, replacedContents);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
