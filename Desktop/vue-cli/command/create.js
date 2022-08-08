// create.js

// const createAction=()=>{
//     console.log(11)
// }
  
  const create = {
    alias: 'c',
    params: '<project-name>',
    description: 'create a new project',
    action: createAction,
  }
const { exec } = require("child_process");

function createAction(name) {
  // 这是模板项目的仓库地址
  const url = "http://github.com/xxx/template.git";
  // 克隆项目
  exec(`git clone ${url} ${name}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      process.exit();
    }
    console.log("Success");
    process.exit();
  });
}
  module.exports = create;