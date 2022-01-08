import { APP_NAME, getMailGenerator } from './config';

const emailTemplate = (firstName, code, link) => ({
    body: {
        intro: `${firstName}!`,
        action: {
            instructions:
                "Welcome to Diatron App. We are glad having you on our platform",
            button: {
                color: '#020f8a',
                text: `${code}`,
                link,
            },
        },
        outro: 'If you did not initiate this request, please ignore this mail.',
    },
});

const generateEmail = (user) => {
    console.log(user)
    const { BASE_URL } = process.env;
    const { firstName, code } = user;
    const mailGenerator = getMailGenerator(BASE_URL);
    const link = emailTemplate(`${firstName}`, `${code}`, `${BASE_URL}`);
    const emailBody = mailGenerator.generate(link);
    return emailBody;
};

export default generateEmail;
