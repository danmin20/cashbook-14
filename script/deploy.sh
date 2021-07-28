#!/bin/bash
echo '---cron 실행---'
cd /home/ubuntu/cashbook-14
git pull

lastCommit=$(cat /home/ubuntu/last-commit.info)
current=$(git rev-parse main)

if [[ $current != $lastCommit ]];
then
  cd client && yarn && yarn build
  cd ../server && yarn && pm2 start

  # 기존 커밋 덮어쓰기
  echo '---update lastCommit.info---'
  echo $current > /home/ubuntu/last-commit.info
fi
