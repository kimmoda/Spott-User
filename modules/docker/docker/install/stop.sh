#!/bin/sh

# Change to the script directory
CWD=$(pwd)
SCRIPT=$(readlink -f $0)
SCRIPT_DIR=`dirname $SCRIPT`
cd $SCRIPT_DIR
. ./setEnv.sh

# configure
if [ ! -f "$SCRIPT_DIR/config_version" ]; then
    . ./configure.sh
fi

# Stop
docker-compose down -v

cd $CWD