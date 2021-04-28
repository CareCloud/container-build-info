const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);


  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  //action
  const repo = github.context.repo;
  const containerRepo = `${repo.owner.toLowerCase()}/${repo.owner.toLowerCase()}`
  console.log(`Container Repo: ${containerRepo}!`);

  core.setOutput("container-repo", time);


} catch (error) {
  core.setFailed(error.message);
}