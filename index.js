const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const readmeBox = require('readme-box').ReadmeBox;

(async () => {
    try {
        const githubToken = core.getInput('github-token');
        const filePath = path.join(process.env.GITHUB_WORKSPACE, core.getInput('json-file-path'));
        const data = fs.readFileSync(filePath, 'utf8');
        // const json = JSON.parse(data);
        console.log('GITHUB REF: ', process.env.GITHUB_REF.split('/')[2]);

        await readmeBox.updateSection(data, {
            owner: process.env.GITHUB_REPOSITORY.split('/')[0],
            repo: process.env.GITHUB_REPOSITORY.split('/')[1],
            branch: process.env.GITHUB_REF.split('/')[2],
            token: githubToken,
            section: 'data-section',
        });
    } catch (error) {
        core.setFailed(JSON.stringify(error));
    }
})();
