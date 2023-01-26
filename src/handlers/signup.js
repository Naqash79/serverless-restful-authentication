/*
    current curl:

    curl --location --request POST 'https://6r3j4knye0.execute-api.us-east-1.amazonaws.com/Prod/signup' \
    --data-raw ''

    will return:

    API is Not Yet Implemented
*/

exports.signupHandler = async (event) => {
  console.info("received:", event);

  let response = {};

  response = {
    statusCode: 200,
    body: "API is Not Yet Implemented",
  };

  return response;
};
