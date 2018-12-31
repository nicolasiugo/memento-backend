const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const transporter = createTransporter()

const mailOptions = {
  from: 'nicolasmedeiros@gmail.com',
  subject: 'El santa invisible 🎅',
  generateTextFromHTML: true
}

const families = [
  'santiago.medeiros@gmail.com',
  'danielmedeiros1959@gmail.com',
  'gonmede@gmail.com',
  'nicolasmedeiros@gmail.com',
  'scollares60@gmail.com',
  'lauradibellor@gmail.com',
  'leticiasanjines@gmail.com'
]

const santas = generateSantas()
sendNotifications(santas, transporter)

function generateSantas() {
  const secretSantas = {}
  const recipients = [...families]
  shuffleArray(families)
  families.forEach(f => {
    const complement = recipients.filter(item => item !== f)
    const recipient = complement[Math.floor(Math.random() * complement.length)]
    recipients.splice(recipients.indexOf(recipient), 1)
    secretSantas[f] = recipient
  })
  return secretSantas
}

function createTransporter() {
  const oauth2Client = new OAuth2(
    '401721973491-pn2kl8givu3g26pq58d7547884vf0oih.apps.googleusercontent.com',
    '7OCvXT70yrTVQVoohcH6jzzf',
    'https://developers.google.com/oauthplayground'
  )

  // oauth2Client.setCredentials({
  //   refresh_token: '4/qwDjOKkZwm72pQJeitBmObWPPjZhSo919IofPFNgU1MrAnRt67Z2iSJ6-UhFC6fuym5XtspPmZT96GzdbwuazKk'
  // })
  // const tokens = await oauth2Client.refreshAccessToken()
  // const accessToken = tokens.credentials.access_token

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'nicolasmedeiroscds@gmail.com',
      clientId: '401721973491-pn2kl8givu3g26pq58d7547884vf0oih.apps.googleusercontent.com',
      clientSecret: '7OCvXT70yrTVQVoohcH6jzzf',
      refreshToken: '4/qwDjOKkZwm72pQJeitBmObWPPjZhSo919IofPFNgU1MrAnRt67Z2iSJ6-UhFC6fuym5XtspPmZT96GzdbwuazKk',
      accessToken: 'ya29.GltqBi01fq8-LIVpGg4RAUXxgOKWQ7wwwkjqZsuW6U5ePc8h6qIvQo2_YVzqcS9brBvCDe35VhuLL87f1XI6RrZmIrichcZZwqf7FHq6CiIOwKAyjvtvqf5wzhYO'
    }
  })
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //       type: 'OAuth2',
  //       xoauth2: xoauth2.createXOAuth2Generator({
  //         scope: 'https://mail.google.com/',
  //         user: 'nicolasmedeiroscds@gmail.com',
  //         clientId: '401721973491-pn2kl8givu3g26pq58d7547884vf0oih.apps.googleusercontent.com',
  //         clientSecret: '7OCvXT70yrTVQVoohcH6jzzf}',
  //         refreshToken: '4/qwDjOKkZwm72pQJeitBmObWPPjZhSo919IofPFNgU1MrAnRt67Z2iSJ6-UhFC6fuym5XtspPmZT96GzdbwuazKk',
  //         accessToken: 'ya29.GltqBi01fq8-LIVpGg4RAUXxgOKWQ7wwwkjqZsuW6U5ePc8h6qIvQo2_YVzqcS9brBvCDe35VhuLL87f1XI6RrZmIrichcZZwqf7FHq6CiIOwKAyjvtvqf5wzhYO'
  //       })
  //   }
  // });
  return transporter
}

async function sendNotifications(secretSantas, mailer) {
  try {
    for (let [key, value] of Object.entries(secretSantas)) {
      mailOptions.to = key
      mailOptions.html = '<h3>Te tocó regalarle a: ' + value + '!</h3><p>jojojo</p><center style="font-size:20px">🎄</center>'
      const res = await mailer.sendMail(mailOptions)
      console.log(key, value)
    }
  } catch (e) {
    console.log(e);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}