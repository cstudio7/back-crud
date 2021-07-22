import { APP_NAME, getMailGenerator } from './config';

const emailTemplate = (link) => ({
  body: {
    intro: `${APP_NAME}!`,
    action: {
      instructions:
        "You're almost there. To finish activating your account please click the link below.",
      button: {
        color: '#020f8a',
        text: 'Welcome Account',
        link,
      },
    },
    outro: 'If you did not initiate this request, please ignore this mail.',
  },
});

const generateEmail = (user) => {
  const { BASE_URL } = process.env;
  // const { token } = user;
  const mailGenerator = getMailGenerator(BASE_URL);
  const link = emailTemplate(`${BASE_URL}`);
  const emailBody = mailGenerator.generate(link);
  return emailBody;
};

export default generateEmail;
