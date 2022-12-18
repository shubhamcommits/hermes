#!/bin/bash

cd $PWD/client

npm run prod

cd -

mkdir hermes

rsync -av --progress $PWD/server/ $PWD/hermes/ --exclude node_modules --exclude files

scp -i "affair-system-server-key.cer" -r $PWD/hermes/ ubuntu@ec2-3-111-214-209.ap-south-1.compute.amazonaws.com:/home/ubuntu/

rm -rf $PWD/hermes/

exit 0