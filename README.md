# MindTouch OAuth 2.0 Authorization Code Flow

Example application to demonstrate MindTouch OAuth API Token authorization.

## Getting Started

1. [Create an OAuth API Token](https://success.mindtouch.com/Integrations/API/Authorization_Tokens/Get_an_OAuth_API_Token)
2. Use `yarn` to install dependencies
3. Copy `config.json.dist` to `config.json`

## Configuration (config.json)

1. Replace `{key}` and `{secret}` with the key and secret values from step 1
2. Replace `example.mindtouch.us` with your MindTouch site hostname
3. Replace `{authid}` with the [identity provider service id](https://success.mindtouch.com/Admin/Authentication/What_is_an_identity_provider/Identity_Provider_Service) that you want to use with the application (`1` is the [built-in sign-in experience](https://success.mindtouch.com/Admin/Authentication/Built-in_Authentication))

## Usage

Start the web server and navigate to `http://localhost:3000`. The application will present different authorization request scenarios to try out and will attempt to fetch a list of authorized applications after the flow is completed.

```sh
bin/www
```
