const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
    #sender = sendgrid
    #GenerateTemplate = Mailgen
    constructor(env) {
        switch (env) {
            case 'development':
                this.link = 'http://localhost:3000'
                break
            case 'production':
                this.link = 'http://localhost:3000'
                break
            default:
                this.link = 'http://localhost:3000'
                break
        }
    }
    #createTemplateVerifyEmail(verifyToken, name) {
        const mailGenerator = new this.#GenerateTemplate({
            theme: 'cerberus',
            product: {
                name: 'System cats',
                link: this.link,
            },
        })
        const email = {
            body: {
                name,
                intro: "Welcome to System cats! We're very excited to have you on board.",
                action: {
                    instructions:
                        'To get started with System cats, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`,
                    },
                },
            },
        }

        const emailBody = mailGenerator.generate(email)
        // console.log(emailBody)
        return emailBody
    }

    async sendVerifyEmail(verifyToken, email, name) {
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email, // Change to your recipient
            from: 'lyuznyaktaras@gmail.com', // Change to your verified sender
            subject: 'Verify email',
            html: this.#createTemplateVerifyEmail(verifyToken, name),
        }

        this.#sender.send(msg)
    }
}

module.exports = EmailService
