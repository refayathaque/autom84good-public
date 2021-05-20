import config from "./cognito.js";

const { identityPoolId, region, userPoolWebClientId, userPoolId } = config;

export default {
  Auth: {
    identityPoolId,
    region,
    userPoolId,
    userPoolWebClientId,
  },
};

// References:

// Object destructuring with ES6
// https://javascript.info/destructuring-assignment#object-destructuring

// Object Property Value Shorthand in JavaScript with ES6
// https://alligator.io/js/object-property-shorthand-es6/

// Creating this 'Auth' object above
// https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource
