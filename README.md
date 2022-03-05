# Polaris
An open source roadmap creator for anyone who has a course.

## Features
- Build roadmaps by admin.
- Show road map in three different views (table, gantt chart, doughnat chart).
- Ability to group users by admin.
- Show all roadmaps to admin.
- Show the roadmap of each group only to its members.

## Setup & Run
### Create Database

1. create a [firebase](https://firebase.google.com/) project.
2. Go to `authentication` and choose `Email/Password` as your sign-in method, mark it as enable and save it.
3. Go to `Realetime Database` and create your database.
4. In realtime database you have some rules, go and change it as bellow:
```
{
  "rules": {
    ".read": true,
    ".write": true,
  }
}
```
### Setup
1. Install dependencies
  ```shell
  $ yarn
  ```
2. Copy `.env.example` file and rename it to `.env`
3. Go to your firebase project setting and create a web app, there is your firebase config, fill in your `.env` file based on them.

### Run
```shell
$ yarn start
```

## Usage
If you want to use Polaris for the first time, you have no admin, first sign up and then go to your firebase project. In the realtime database section you can see all of your data, open user, change the `isApproved` field to `true` and the `type` to `admin`. Now you are an admin. If another person wants to be an admin, all you have to do is go to the users section in admin panel and change him type as admin.

Note: No one can login without admins permission, after each user registered, admin must approved the user through his panel.

### Create Roadmap
1. Create your categories.
2. Create your learnings.
3. Create your projects.
4. Create your phases based on learnings and projects.
5. Create your roadmap using relevent phases.
6. Create group and asign the relevent roadmap to it.
7. Asign groups to relevent users.
