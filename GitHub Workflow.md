# GitHub Workflow
1. Identify relatively small functionality you are implementing (e.g. JWT token authorization for login, backend api endpoint for creating a referral, etc.)
2. Create a branch locally for that functionality:
```
$ git checkout -b [descriptive name]
```
3. Push the branch to remote:
```
$ git push -u origin [same branch name as above]
```
4. Begin development of functionality with frequent commits and pushes to the remote
```
// Verify which changes you made:
$ git status

// Add specific files to the commit:
$ git add [1 or more file names separated by spaces]

// Alternatively you can add all changes to the commit:
$ git add -A
$ git commit -m "[descriptive commit message of changes you made]"

// Push changes to your remote branch:
$ git push origin [your branch name]
```
5. When the functionality is done, merge the main branch into your feature branch and resolve any conflicts (this can also be done frequently during development):
```
// Switch to main branch:
$ git checkout main

// Pull in the latest changes from remote:
$ git pull origin main

// Switch back to your branch:
$ git checkout [your branch name]

// Merge main branch into your branch and resolve any conflicts:
$ git merge main
```
6. Commit and push your latest changes to your remote branch according to step 4.
7. Open a pull request to merge your branch into the main branch with the following name format:
```
[Feature Name] - descriptive functionality name
```
Also, don't forget to include a detailed description of your changes!
