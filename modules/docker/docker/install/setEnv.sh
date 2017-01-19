#!/bin/sh

# Get the directory info
SCRIPT=$(readlink -f $0)
SCRIPT_DIR=`dirname $SCRIPT`

# Set local environment
if [ ! -f "$SCRIPT_DIR/setLocalEnv.sh" ]; then
    cp "$SCRIPT_DIR/setLocalEnvSample.sh" "$SCRIPT_DIR/setLocalEnv.sh"
    chmod +x "$SCRIPT_DIR/setLocalEnv.sh"
fi
. "$SCRIPT_DIR//setLocalEnv.sh"

# We need the deployment environment
if [ -z "$DEPLOY_ENV" ]; then
    echo "Error: No DEPLOY_ENV environment variable set. Please check the contents of $SCRIPT_DIR/setLocalEnv.sh"
    exit 1
fi

# We need the configuration directory
if [ ! -f "$SCRIPT_DIR/config/Dockerfile" ]; then
    echo "Error: $SCRIPT_DIR/config/Dockerfile does not exist. Unable to create the configuration container"
    exit 1
fi

# Start with sample
if [ ! -f "$SCRIPT_DIR/docker-compose.yml" ]; then
    cp $SCRIPT_DIR/docker-compose-sample.yml $SCRIPT_DIR/docker-compose.yml
fi

# Loqd configuration
if [ -f "$SCRIPT_DIR/config_version" ]; then
    export CONFIG_VERSION=$(cat "$SCRIPT_DIR/config_version")
fi