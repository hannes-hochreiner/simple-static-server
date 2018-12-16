npm run build
mkdir simple-static-server
cp -r lib simple-static-server
cp package.json simple-static-server
cp package-lock.json simple-static-server
cd simple-static-server
npm install --production
cd ..
tar --create --gzip --file=simple-static-server-`./node_modules/.bin/json < package.json version`.tar.gz simple-static-server
sed -e s/^Version.*$/Version:\ `./node_modules/.bin/json < package.json version`/ \
    -e s/^Source.*$/Source:\ simple-static-server-`./node_modules/.bin/json < package.json version`.tar.gz/ simple-static-server.spec.tmpl > simple-static-server.spec
rm -r simple-static-server
