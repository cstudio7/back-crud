import { APP_NAME, getMailGenerator } from './config';

const emailTemplate = (code, link) => ({
  body: {
    intro: `${APP_NAME}!`,
    action: {
      instructions:
        "You're almost there. To finish activating your account please use the link below.",
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
  const { BASE_URL } = process.env;
  const { code } = user;
  const mailGenerator = getMailGenerator(BASE_URL);
  const link = emailTemplate(`${code}`, `${BASE_URL}`);
  const emailBody = mailGenerator.generate(link);
  return emailBody;
};

export default generateEmail;
