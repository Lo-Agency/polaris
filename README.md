# Polaris
An open source roadmap creator for anyone who has a course.

## Features
- Build roadmaps by an admin.
- Show road maps in three different views (table, Gantt chart, doughnut chart).
- Ability to group users.
- Admin can see all roadmaps.
- Users of each group can see their assigned roadmaps.

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
If you want to use Polaris for the first time, you have no admin, first sign up and then go to your firebase project. In the real-time database section, you can see all of your data, open user, change the `isApproved` field to `true` and the `type` to `admin`. Now you are an admin. If another person wants to be an admin, you have to go to the users' section in the admin panel and change his type as admin.

**Note**: No one can log in without the admin's permission after each user registers; an admin must approve the user through his panel.

### Create Roadmap
1. Create your learnings.
2. Create your projects.
3. Create your phases based on learnings and projects.
4. Create your roadmap using relevent phases.
5. Create group and asign the relevent roadmap to it.
6. Asign groups to relevent users.
