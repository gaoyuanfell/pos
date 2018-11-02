#!/usr/bin/env bash
echo "Start to publish..."
git add .
date=$(date '+%Y-%m-%d %H:%M:%S → moka')
commit="git commit -am '"$date"'"
eval $commit
git pull origin master
git pull yc master
git push origin master
git push yc master
echo "Success"
