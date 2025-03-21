#! /usr/bin/env bash

# TO be run from the main folder outside backend 

export PYTHONPATH=$PYTHONPATH:$(pwd)/src/backend
echo "PYTHONPATH is: $PYTHONPATH" 

cd src/backend/nedaflow
python -c "from nedaflow.app import app; import json; print(json.dumps(app.openapi()))" > ./openapi.json
cd ../..
mv backend/nedaflow/openapi.json frontend/
cd frontend
npm run generate-client
npx biome format --write ./src/client