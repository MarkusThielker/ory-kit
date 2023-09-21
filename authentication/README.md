# Authentication UI

This sveltekit application is the authentication UI for our Ory Kratos instance.
It implements the dynamic flow system, used by Kratos, to render the required inputs.

It also implements the consent screen for the Ory Hydra consent flow.

## Getting started

To get started, clone this repository and start the backend services as described in the Docker README. 

Then, install the dependencies and start the development server:

```bash
# install dependencies
npm install

# use the example environment for development
cp .env.example .env

# start the development server
npm run dev
```

This starts the authentication UI on port 4422. You can access it at http://localhost:4422.

## Dynamic Flows

Ory Kratos uses a unique approach to handle user flows, such as registration, login, and profile updates. 
Instead of prescribing a specific UI or forcing developers to use a particular frontend framework, Ory Kratos provides a dynamic and API-first approach. 
This allows developers to build custom user interfaces that fit their application's needs while still leveraging the robust backend logic of Ory Kratos.

Here's a high-level overview of how the flow system with dynamic UIs works in Ory Kratos:

### 1. Initialization of a Flow
When a user wants to perform an action, like registering or logging in, the frontend application initiates a request to the Ory Kratos API to start the respective flow.

### 2. API Response with Form Fields
Ory Kratos responds with a payload that describes the required form fields for that flow. This payload is dynamic and can change based on the configuration or context. For instance, the registration flow might require fields like email, password, and terms_of_service_agreement.

### 3. Rendering the UI
The frontend application takes this payload and dynamically renders the appropriate form fields. Since the frontend receives a description of what fields are needed, developers have the freedom to design and style the UI as they see fit.

### 4. User Interaction
The user interacts with the dynamically generated form, filling out the necessary fields. Once the user submits the form, the frontend application sends the data back to Ory Kratos for processing.

### 5. Processing & Validation
Ory Kratos processes the submitted data, performs validations, and checks for any errors. If there are issues (e.g., a password doesn't meet the required criteria), Ory Kratos responds with an error payload that the frontend can use to display appropriate error messages.

### 6. Completion of the Flow
If the data is valid and the flow completes successfully (e.g., the user is registered or logged in), Ory Kratos can redirect the user to a predefined URL or handle the next steps as configured. For flows like login, once successfully completed, Ory Kratos creates a session for the user. The frontend can then use this session to authenticate subsequent requests or to determine the user's logged-in state.

## Implementation

To display a flow on a page, I created a Flow component taking the UiContainer, the data representation of the required form provided by the flow, and a list of groups.

We always want to render the 'default' group adding a hidden input with the CSRF token and one group, for example 'totp'.
Then all form inputs in the groups are rendered including the submit button, action and form method are provided by the flow as well.

If you want to change the style of this authentication UI, you can edit the $lib/styles/app.css or the components them self in $lib/components/ory/ 

## Running this UI with Ory Network

Ory Network is the cloud solution run and managed by Ory. This UI can of cause also be used with the Ory Network since it uses the official ory client SDK to communicate with Kratos. Just edit the Ory Client API configuration in $lib/ory/index.ts.
