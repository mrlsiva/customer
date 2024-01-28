const _fs = require('fs');

const args = process.argv
  .slice(2)[0]
const skip_arg = process.argv
  .slice(2)[1];

// Configure Angular `environment.ts` file path
const targetPath =
	args
		? '/src/environments/environment.' + (args == 'production' || skip_arg ? 'prod' : args) + '.ts'
    : '/src/environments/environment.ts';

// Load node modules
const colors = require('colors');
require('dotenv').config({ path: args ? '.env-' + args : '.env' });

console.log(args, __dirname + targetPath);

const env = process.env;
if (!env) throw console.error("Env config file generation failed.");

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: ${env["PRODUCTION"]},
  BASE_URL: "${env["BASE_URL"]}"
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
_fs.writeFile(__dirname + targetPath, envConfigFile, { flag: 'w' }, function (err: any) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated at ${targetPath} \n`));
   }
});
