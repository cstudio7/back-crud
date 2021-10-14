import { APP_NAME, getMailGenerator } from './config';

const emailTemplate = (firstName, link) => ({
    body: {
        intro: `${firstName}!`,
        action: {
            instructions:
                "Welcome to Diatron App. We are glad having you on our platform",
            button: {
                color: '#020f8a',
                text: APP_NAME,
                link,
            },
        },
        outro: 'If you did not initiate this request, please ignore this mail.',
    },
});

const generateEmail = (user) => {
    const { BASE_URL } = process.env;
    const { firstName } = user;
    const mailGenerator = getMailGenerator(BASE_URL);
    const link = emailTemplate(`${firstName}`, `${BASE_URL}`);
    const emailBody = mailGenerator.generate(link);
    return emailBody;
};

export default generateEmail;
