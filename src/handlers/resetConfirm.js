/*
  curl --location --request POST 'https://5af344t0ml.execute-api.us-east-1.amazonaws.com/Prod/confirmReset' \
  --header 'Content-Type: application/json' \
  --data-raw '{"email":"johngjackson0@gmail.com", "verificationCode": "793108", "newPassword": "dsfdDFDF!3424"}'

  Recieved: 

  {
    "message": "Password reset successful"
  }
*/

const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.resetConfirmHandler = async (event) => {
  const body = JSON.parse(event.body);
  const { email, verificationCode, newPassword } = body;

  const params = {
    ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
    ConfirmationCode: verificationCode,
    Password: newPassword,
    Username: email,
  };

  try {
    await cognitoIdentityServiceProvider
      .confirmForgotPassword(params)
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password reset successful" }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Password reset failed",
        error: err.message,
      }),
    };
  }
};
