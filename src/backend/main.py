"""
🧩 1. Workflow API Interface & Public Exposure
Handles external access to workflows (via REST API), includes handler and service logic.

https://github.com/n8n-io/n8n/blob/master/packages/cli/src/public-api/v1/handlers/workflows/workflows.handler.ts
https://github.com/n8n-io/n8n/blob/master/packages/cli/src/public-api/v1/handlers/workflows/workflows.service.ts

https://github.com/n8n-io/n8n/blob/master/packages/cli/src/services/public-api-key.service.ts


🛠️ 2. Workflow Internal Services & Execution Engine
Core logic for running, managing, and interpreting workflows.

https://github.com/n8n-io/n8n/blob/master/packages/cli/src/workflow-runner.ts
https://github.com/n8n-io/n8n/blob/master/packages/cli/src/workflows/workflow.service.ts
https://github.com/n8n-io/n8n/blob/master/packages/workflow/src/Workflow.ts


⚙️ 3. Task Execution Runners
Controls how tasks (i.e., workflows or nodes) are run, including subprocess and worker pool strategies.

https://github.com/n8n-io/n8n/tree/master/packages/cli/src/scaling
https://github.com/n8n-io/n8n/tree/master/packages/cli/src/task-runners


🧪 4. Workflow CLI Tools
Commands for exporting, importing, listing, and updating workflows through the CLI.

packages/cli/src/commands/list/workflow.ts
packages/cli/src/commands/export/workflow.ts
packages/cli/src/commands/update/workflow.ts
packages/cli/src/commands/import/workflow.ts

🗂️ 5. Workflow Entity & Type Definitions
Models, shared data types, and contracts used throughout the system.

packages/cli/src/databases/entities/shared-workflow.ts
https://github.com/n8n-io/n8n/tree/master/packages/cli/src/executions


🧬 6. Execution Lifecycle & Error Handling
Handles what happens during or after a workflow execution, especially on failure.

packages/cli/src/execution-lifecycle/execute-error-workflow.ts
https://github.com/n8n-io/n8n/blob/master/packages/cli/src/public-api/v1/handlers/executions/executions.handler.ts
packages/@n8n/api-types/src/push/workflow.ts


📡 7. Event Handling & Messaging
Event-driven system that communicates workflow states and messages across components.

packages/cli/src/eventbus/event-message-classes/event-message-workflow.ts
packages/nodes-base/test/nodes/ExecuteWorkflow.ts
https://github.com/n8n-io/n8n/tree/master/packages/cli/src/eventbus

🧑‍🎨 9. Frontend Workflow Execution (Editor UI Interaction)
How the frontend editor triggers, interacts with, and fetches workflow execution info.

https://github.com/n8n-io/n8n/blob/master/packages/cli/src/public-api/v1/handlers/workflows/workflows.handler.ts
https://github.com/n8n-io/n8n/tree/master/packages/frontend/editor-ui/src/api
packages/frontend/editor-ui/src/composables/useRunWorkflow.ts


🌐 10. Webhooks
Webhook support that allows workflows to be triggered via HTTP requests.

https://github.com/n8n-io/n8n/tree/master/packages/cli/src/webhooks


"""