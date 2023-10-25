#!/bin/bash

# Define the root directory for the search
ROOT_DIR="../slices"

# Use the find command to search for 'api' directories inside 'slices'
find "$ROOT_DIR" -type d -name 'api' | while read -r dir; do
    echo "Installing npm packages in $dir..."
    # Navigate to the directory and run npm install
    (cd "$dir" && npm i)
done