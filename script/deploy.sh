#!/bin/bash

cd client && yarn && yarn build
cd ../server && yarn && yarn start