const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const readmeBox = require('readme-box').ReadmeBox;
const chunk = require('chunk');

(async () => {
    try {
        const githubToken = core.getInput('github-token');
        const filePath = path.join(process.env.GITHUB_WORKSPACE, core.getInput('json-file-path'));
        const data = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(data);
        console.log('GITHUB REF: ', process.env.GITHUB_REF.split('/')[2]);

        const columns = 2; // @TODO move to input
        let content = chunk(json, columns)
            .map((row) => {
                const cells = row.map((user) => (`<td align="center">
                            <p><a href="https://github.com/${user.githubUsername}">${user.name}</a></p>
                            <img src="${user.imageUrl}" />
                            <p><a href="https://github.com/EddieJaoudeCommunity/awesome-github-profiles/issues/${user.issueNumber}">(:100: give your vote)</a></p>
                        </td>`));

                if (cells.length < columns) {
                    cells.push('<td></td>'.repeat(columns - cells.length));
                }

                return `<tr>${cells.join('')}</tr>`;
        });

        await readmeBox.updateSection(`<table width="100%">${content.join('')}</table>`, {
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
