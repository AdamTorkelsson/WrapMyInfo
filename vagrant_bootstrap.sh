#!/usr/bin/env bash

echo "--- Updating packages list ---"
sudo apt-get update

echo "--- Enable add-apt-repository ---"
sudo apt-get install -y python-software-properties

echo "--- Add Node.js to known repos ---"
sudo add-apt-repository -y ppa:chris-lea/node.js

echo "--- Updating packages list ---"
sudo apt-get update

echo "--- Installing dependencies ---"
sudo apt-get install -y nodejs git-core wget curl postgresql postgresql-contrib screen

echo "--- Install Bower, less compiler and supervisor ---"
#sudo npm install -g bower
#sudo npm install -g less
sudo npm install -g supervisor

echo "--- cd into /home/vagrant/wrapmyinfo ---"
cd /home/vagrant/wrapmyinfo

echo "--- Download Node.js Dependencies ---"
sudo npm install

echo "--- Init database ---"
cat << EOF | sudo -u postgres psql
-- Create the database user:
CREATE USER wrapmyinfo WITH PASSWORD 'wrapmyinfo';

-- Create the database:
CREATE DATABASE wrapmyinfo WITH OWNER=wrapmyinfo
                                  LC_COLLATE='en_US.utf8'
                                  LC_CTYPE='en_US.utf8'
                                  ENCODING='UTF8'
                                  TEMPLATE=template0;
EOF

echo "--- Add aliases to simplify development ---"
echo "alias wrapmyinfo-migrate='nodejs /home/vagrant/wrapmyinfo/node_modules/.bin/sequelize db:migrate --migrations-path database/migrations --models-path app/models'" >> /home/vagrant/.bashrc
echo "alias wrapmyinfo-create-migration='nodejs /home/vagrant/wrapmyinfo/node_modules/.bin/sequelize migration:create --migrations-path database/migrations --models-path app/models'" >> /home/vagrant/.bashrc
echo "alias wrapmyinfo-create-model='nodejs /home/vagrant/wrapmyinfo/node_modules/.bin/sequelize model:create --migrations-path database/migrations --models-path app/models'" >> /home/vagrant/.bashrc

echo "--- Configure environment variables ---"
[ ! -f /home/vagrant/wrapmyinfo/.env ] && cp /home/vagrant/wrapmyinfo/.env.vagrant /home/vagrant/wrapmyinfo/.env.vagrant
nodejs /home/vagrant/wrapmyinfo/bin/build.js

echo "--- Generate SSL/TLS key and cert ---"
mkdir tls
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /home/vagrant/wrapmyinfo/tls/private.key -out /home/vagrant/wrapmyinfo/tls/certificate.crt \
    -subj /C=SE/ST=Göteborg/O=WrapMyInfo/localityName=Göteborg/commonName=127.0.0.1/organizationalUnitName=WrapMyInfo/emailAddress=adam@wrapmyinfo.com

echo "--- Done ---"