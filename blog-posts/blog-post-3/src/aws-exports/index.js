import {
  identityPoolId,
  region,
  userPoolId,
  userPoolWebClientId,
} from "./cognito.js";

export default {
  Auth: {
    identityPoolId,
    region,
    userPoolId,
    userPoolWebClientId,
  },
};  

// References:

// Object Property Value Shorthand in JavaScript with ES6
// https://alligator.io/js/object-property-shorthand-es6/

// Creating this 'Auth' object above
// https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource