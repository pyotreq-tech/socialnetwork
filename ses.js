const aws = require("aws-sdk");

let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}
const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = function (receipent, message, subject) {
    return ses
        .sendEmail({
            Source: "Piotr Majtyka <knowing.alder@spicedling.email>",
            Destination: {
                ToAddresses: [receipent],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!, reset email got sent"))
        .catch((err) => console.log("error in sending email", err));
};
