# Toptal-Classes

This project is to satify the Toptal react-native academy project. 

## Requirements

* The application must be React-based.
* Users must be able to create an account and log in.
* Include at least 3 user roles with different permission levels:
  * A student should be able to log in, see a list of classes that have occurred to date, and say that they attended.
  * A teacher should be able to log in, create new classes / edit old classes, see who has claimed they have attended a particular class, and then approve / reject claims.
  * An admin should be able to do everything.
* The app should include a REST API. You should create your own back-end or use any BaaS solution like Firebase. It should be possible to perform all user actions via this API, including authentication.
* The application should have unit and e2e tests.
We will not be scoring on the visual design of the application, but please try and make it clean and tidy (Bootstrap helps).

## Notes to reviewers

I understand we were expected to write some kind of web app, but I personally had an interest in learning React Native, therefore this project was written using that technology. I'm a mobile developer, and the experience writing this app was amazing. I understand if this does not meet your requirements, but I'm hoping you will still take my submission into consideration.

The backing data store is Firebase.

Here are some GIFs showing off the application

Signing up and Logging in
![https://raw.githubusercontent.com/vijaysharm/toptal-classes/master/signup-login.gif](signup-login.gif)

Adding/Editing classes, Attending classes, Accepting/Rejecting attendence
![https://raw.githubusercontent.com/vijaysharm/toptal-classes/master/toptal-classes.gif](toptal-classes.gif)

## Building

```
# npm install && npm start
```

Open either the iOS or Android project and launch on your running simulator/emulator.

# Tests

I'm making use of Jest to run tests as descibed in the react-native [documentation](https://facebook.github.io/react-native/docs/testing.html#content).

```
# npm install && npm test
```
