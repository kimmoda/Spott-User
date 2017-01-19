#!/bin/sh

# Change to the script directory
CWD=$(pwd)
SCRIPT=$(readlink -f $0)
SCRIPT_DIR=`dirname $SCRIPT`
cd $SCRIPT_DIR
. ./setEnv.sh

# Keep track of the version
export CONFIG_VERSION=$(date +"%C%y%m%d-%H%M%S")
echo $CONFIG_VERSION > config_version

# Create the configuration container
docker build -t docker.appiness.mobi/spott-$DEPLOY_ENV-website-config:$CONFIG_VERSION $SCRIPT_DIR/config
docker push docker.appiness.mobi/spott-$DEPLOY_ENV-website-config:$CONFIG_VERSION

cd $CWD