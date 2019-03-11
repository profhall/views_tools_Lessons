_New to coding or need to setup your development environment? [Check out this
guide](https://github.com/viewstools/docs/blob/master/DevEnvironmentSetup.md)._

Install the dependencies in your app's folder. Open the terminal and run:
```
npm install
```

Now you're ready to build the app. Open a terminal and run:
```
npm run build
```

It will create a `build` folder containing your production-ready app.

That's what you should deploy next. If you don't have any deployment mechanisms,
you can try free services like [netlify](https://netlify.com) or [surge](https://surge.sh).
We've preconfigured Surge as a deployment mechanism for simplicity:

Install surge (you only need to do this once). Open the terminal and run:
```
npm install --global surge
```

Then any time you want to deploy your app, on your main project's folder, run:
```
npm run deploy
```
