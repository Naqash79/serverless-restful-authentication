/*

  After the user signs up, AWS will send an email to the user containing a confirmation code. This confirmation code must be used to confirm the account and receive the authentication token.

  curl --location --request POST 'https://t8d33bil8j.execute-api.us-east-1.amazonaws.com/Prod/confirm' \
  --header 'Content-Type: application/json' \
  --data-raw '{"email":"boxaka5531@ekcsoft.com", "password":"dsfdDFDF!3424", "confirmationCode": "778797"}'

  Returns: 

  {
    "message": "User has been signed up successfully.",
    "token": "[token here]"
  }
*/

const AWS = require("aws-sdk");

exports.confirmHandler = async (event) => {
  try {
    const cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
    const { email, password, confirmationCode } = JSON.parse(event.body);

    const confirmSignUpParams = {
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      ConfirmationCode: confirmationCode,
      Username: email,
    };
    await cognitoIdentityServiceProvider
      .confirmSignUp(confirmSignUpParams)
      .promise();

    const authParams = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const authResponse = await cognitoIdentityServiceProvider
      .initiateAuth(authParams)
      .promise();
    const token = authResponse.AuthenticationResult.IdToken;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User has been signed up successfully.",
        token: token,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
