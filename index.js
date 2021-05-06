const core = require('@actions/core');
const github = require('@actions/github');

try {

  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  //action


  const repo = github.context.repo;

  // Resolve Container Image name
  const inputImageName = core.getInput('image-name');
  const imageName = (inputImageName || repo.repo).toLowerCase();
  console.log(`Container Image: ${imageName}!`);

  // Resolve Container Repository owner
  const containerRepoOwner = repo.owner.toLowerCase()
  console.log(`Container Repo: ${containerRepoOwner}!`);


  // Resolve Container Repository name
  const containerRepo = `${containerRepoOwner}/${imageName}`
  console.log(`Container Repo: ${containerRepo}!`);


  // Resolve Container Image tag value. If it is a release. tag will be the release name, 
  // otherwise it defaults to the commit sha
  const contextRef = github.context.ref;
  const tagPrefix = "refs/tags/"
  const isTagged = contextRef.startsWith(tagPrefix)

  // This removes the 'refs/tags' portion of the string, i.e. from 'refs/tags/v1.13.7' to 'v1.13.7'
  const imageTag = isTagged ? contextRef.replace(tagPrefix, "") : github.context.sha
  console.log(`Container Image tag: ${imageTag}!`);


  // Resolve Development Infrastructure branch name
  const inputDevelopInfraBranchName = core.getInput('development-infrastructure-branch');
  const developInfraBranchName = inputDevelopInfraBranchName || 'develop';
  console.log(`Development Infrastructure branch name: ${developInfraBranchName}!`);


  // Resolve Release Infrastructure branch name
  const inputReleaseInfraBranchName = core.getInput('release-infrastructure-branch');
  const releaseInfraBranchName = inputReleaseInfraBranchName || 'qa';
  console.log(`Release Infrastructure branch name: ${releaseInfraBranchName}!`);


  // Resolve Infrastructure branch to be updated
  // if it is a tag select release branch otherwise select the development branch
  const infrastructureBranch = isTagged? releaseInfraBranchName : developInfraBranchName
  console.log(`Infrastructure branch to be updated: ${infrastructureBranch}!`);


  // Set Outputs
  core.setOutput("container-repo", containerRepo);
  core.setOutput("container-repo-owner", containerRepo);
  core.setOutput("container-image-name", imageName);
  core.setOutput("container-image-tag", imageTag);
  core.setOutput("infrastructure-branch", infrastructureBranch);

} catch (error) {
  core.setFailed(error.message);
}