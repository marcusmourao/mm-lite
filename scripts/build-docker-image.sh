#!/bin/bash

get_package_property(){
  arg1=$1
  cat package.json \
  | grep $arg1 \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]'
}

PACKAGE_NAME=$(get_package_property name)
PACKAGE_VERSION=$(get_package_property version)
IMAGE_TAG="$PACKAGE_NAME:$PACKAGE_VERSION"


echo "Package name:" $PACKAGE_NAME
echo "Package version:" $PACKAGE_VERSION
echo "Image tag:" $IMAGE_TAG

echo "Starting build..."

docker build . -t $IMAGE_TAG --no-cache

echo "Build finished!"
