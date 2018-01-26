#  Ripple

## To run locally for development:
_Note that you’ll need to have [Node](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Xcode](https://developer.apple.com/xcode/) installed._

* Clone the repo: `$ git clone https://github.com/drewandre/ripple.git <YOUR_APP_NAME>`
* Install JS dependencies: `$ npm install`
* Fire up an iOs simulator: `react-native run-ios`
* Or an Android simulator: Run Genymotion, and `react-native run-android`

## To Lint on Commit:
This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

* To Bypass Lint:
If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

*Understanding Linting Errors:
The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.
