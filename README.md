# Polaris
Roadmap creator

## Features
admin can create roadmaps which contains learning, phase and projects.
each roadmap can assign to specific group then can assign groups to users.

## Setup & Run
create firebase project

- Setup authentication and enable email/password for sign-in method.
- Create realtime database and edit rules as bellow

```shell
{
  "rules": {
    ".read": true,
    ".write": true,
  }
}
```
duplicate .env.example file then rename it to .env and add firebase config to it.
REACT_APP_DSN_URL is for sentry so if you dont have sentry account no need to fill it.

```shell
$ yarn install
$ yarn start
```
At first to sign up account as admin then must go to realtime database then go to user directory and set isApproved `true` and type to admin then your admin create and later can approve user that signup to system.
