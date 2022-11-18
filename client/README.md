# Draft version of "Brain Development" Project (client side only)

## Capabilities

In this version of project you can:

### `create users`

To create a new user click **registration button** in dropdown menu.\
You can create multiple users, but keep in mind - each user must have unique **login** and **email** properties.\

### `login`

To login as a registered user click **login button** in dropdown menu and enter the credentials.\
Of course the user whose credentials you are attempting to use must be created before.

### `play games`

Four games are available now.\
Visit [http://localhost:3000/games](http://localhost:3000/games) to see games navigation page.\
Or follow to each game personal page with additional information about it:
- [http://localhost:3000/games/1](http://localhost:3000/games/1)
- [http://localhost:3000/games/2](http://localhost:3000/games/2)
- [http://localhost:3000/games/3](http://localhost:3000/games/3)
- [http://localhost:3000/games/4](http://localhost:3000/games/4)

### `learn games statistics`

**Statistics is available only if you are playing as registered player.**\
To see your achievements follow to [http://localhost:3000/profile/login](http://localhost:3000/profile/login)

## Worth to mention

Users, authentication data and achievements are preserved in global state handled by redux, so if you decide to reload the page all data will be reseted.

## Technology stack

- React
- Redux, Redux Toolkit
- React Spring (for animations)
- Other react libraries
