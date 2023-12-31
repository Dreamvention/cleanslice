export default {
  project: 'cleanclices',
  env: 'prod',
  region: 'us-east-1',
  profile: 'dreamvention',
  imageUrl: 'images.mobiflor.com',
  cognitoUrl: 'auth.mobiflor.com',
  apiUrl: 'https://api.mobiflor.com/',
  appUrl: 'https://app.mobiflor.com/login',
  VPC_CIDR: 10,
  DB_NAME: "mobiflor${opt:stage, 'dev'}",
  DB_USERNAME: 'est',
  google: {
    client_id: '230977074410-81d48lrg7mgkq2i2vpbelc3sad2ko355.apps.googleusercontent.com',
    client_secret: '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',
  },
  userPoolCallbacks: [
    'https://app.mobiflor.com/login',
    'https://app.mobiflor.com/register',
    'http://localhost:3000/login',
    'http://localhost:3000/register',
  ],
  userPoolLogoutURLs: ['https://app.mobiflor.com/logout', 'http://localhost:3000/logout'],
  branchName: 'main',
  slsStage: 'prod',
};
