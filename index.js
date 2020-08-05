const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

try {
    const filePath = core.getInput('json-file-path');
    const content = fs.readFileSync(path.join(process.env.GITHUB_WORKSPACE, filePath));
    console.log(content);
    console.log(JSON.parse(content));
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
