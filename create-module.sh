#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Please provide the root folder name as an argument."
    exit 1
fi

root_folder="$1"

mkdir -p "src/modules/$root_folder"/{app/{use-cases,dtos},domain/{entities,repositories},infra/repositories}

if [ $? -eq 0 ]; then
    echo "Structure of folders created successfully"
else
    echo "An error occurred while creating the folder structure"
fi
