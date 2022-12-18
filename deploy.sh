#!/bin/bash

cd $PWD/client

npm run prod

cd -

mkdir sre-affair

rsync -av --progress $PWD/server/ $PWD/sre-affair/ --exclude node_modules --exclude files

scp -i "affair-system-server-key.cer" -r $PWD/sre-affair/ ubuntu@ec2-3-111-214-209.ap-south-1.compute.amazonaws.com:/home/ubuntu/

rm -rf $PWD/sre-affair/

exit 0