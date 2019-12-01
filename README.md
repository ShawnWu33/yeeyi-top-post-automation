# yeeyi-top-post-automation
### installation 

#### 1. Download node js  from https://nodejs.org/

#### 2. Clone the git repo
Run following commands on your CLI
```
git clone https://github.com/ShawnWu33/yeeyi-top-post-automation.git
cd yeeyi_yeeyi-top-post-automation
npm install
```
(Please make sure you have administrator rights on your computer before install)
#### 3. Change account configuration
Open account_sample.js with the editor you like, replace username, password and links of your posts. Then change the filename to account.js

#### 4. Run the scripts
```
node index.js
```

### Cron job
For make this automation cron job, I would recommend npm package [node-cron](https://www.npmjs.com/package/cron)


