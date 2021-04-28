const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);


  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  //action


  const repo = github.context.repo;
  
  // Resolve Container Image name
  const inputImageName = core.getInput('image-name');
  const imageName  = (inputImageName || repo.repo).toLowerCase();
  console.log(`Container Image: ${imageName}!`);
  

  // Resolve Container Repository name
  const containerRepo = `${repo.owner.toLowerCase()}/${imageName}`
  console.log(`Container Repo: ${containerRepo}!`);


  const imageTag =  github.event.release.tag_name 
  console.log(`Container Tag: ${imageTag}!`);
  //github.event.release.tag_name || github.sha 

  // Set Outputs
  core.setOutput("container-repo", containerRepo);
  core.setOutput("container-image-name", imageName);


} catch (error) {
  core.setFailed(error.message);
}