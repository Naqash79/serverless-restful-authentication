const AWS = require("aws-sdk");

exports.refreshHandler = async (event) => {
  const cognitoIdentityServiceProvider =
    new AWS.CognitoIdentityServiceProvider();

  try {
    const { refreshToken } = JSON.parse(event.body);
    console.log(refreshToken);

    const refreshParams = {
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: "qf3oj4jkp9p1agcnkdmnm7gbj",
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };
    const refreshResponse = await cognitoIdentityServiceProvider
      .initiateAuth(refreshParams)
      .promise();
    const token = refreshResponse.AuthenticationResult.IdToken;
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Token has been refreshed successfully.",
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
