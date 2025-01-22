#! /usr/bin/env bash

set -e
set -x
cd src/backend/nedaflow
python -c "from app import app; import json; print(json.dumps(app.app.openapi()))" > ./openapi.json
cd ../..
mv backend/nedaflow/openapi.json frontend/
cd frontend
npm run generate-client
npx biome format --write ./src/client