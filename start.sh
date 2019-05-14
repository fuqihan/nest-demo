pm2 delete core
pm2 delete user 
pm2 delete historys 
pm2 delete company
# git pull
cd ./common/
yarn
cd ..
echo 'core'
cd ./core/
yarn
rm -rf dist
npm run prestart:prod
npm run prestart:cp
pm2 start ./dist/core/src/main.js --name="core"
cd ..
echo 'user'
cd ./user/
yarn
rm -rf dist
npm run prestart:prod
npm run prestart:cp
pm2 start ./dist/user/src/main.js --name="user"
cd ..
echo 'history'
cd ./history/
yarn
rm -rf dist
npm run prestart:prod
npm run prestart:cp
pm2 start ./dist/history/src/main.js --name="historys"
cd ..
echo 'company'
cd ./company/
yarn
rm -rf dist
npm run prestart:prod
npm run prestart:cp
pm2 start ./dist/company/src/main.js --name="company"