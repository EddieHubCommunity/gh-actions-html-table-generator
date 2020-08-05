const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    const path = core.getInput('json-file-path');
    const content = fs.readFileSync(path);
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
