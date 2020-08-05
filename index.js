const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const path = require("path");
const readmeBox = require("readme-box").ReadmeBox;

(async function () {
    try {
        const filePath = core.getInput("json-file-path");
        const content = fs.readFileSync(
            path.join(process.env.GITHUB_WORKSPACE, filePath)
        );
        const json = JSON.parse(content);
        console.log(json); // @TODO: debug

        await readmeBox.updateSection(json, {
            owner: process.env.GITHUB_REPOSITORY.split("/")[0],
            repo: process.env.GITHUB_REPOSITORY.split("/")[1],
            token: process.env.GITHUB_TOKEN,
            section: "data-section",
        });

        const time = new Date().toTimeString();
        core.setOutput("time", time);
    } catch (error) {
        core.setFailed(error.message);
    }
});
