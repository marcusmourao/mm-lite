#!/bin/bash

echo "Checking for release action..."

IS_RELEASE_COMMIT=$(git log -1 --pretty=format:%s | grep "release: v.*")

if [ -z "$IS_RELEASE_COMMIT" ]
then
    echo "Starting release flow..."
    npm ci
    npm run release
    echo "Finished release with success."
else
    echo "Skipping release flow."
fi
