const { hasCustomGetInitialProps } = require("next/dist/build/utils");
const nodemailer = require("nodemailer")


async function main() {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "kam@rapidautoworks.com",
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    await transporter.sendMail({
        to: "kamerenrichardson1@gmail.com",
        subject: "Your recent service request",
        from: '"Kam @ RapidAuto"',
        html: `
            <p style= "font-size: 15px" >There are new quote options for your service request. Use the link below or click <a href="https://www.google.com">here</a> to continue with your request. </p>
            <a style="width: 100%; height: 10px"; background-color: red; color: white; padding: 5%>View Quote Options</a>
        `
    }).catch(error => {
        console.log(error)
    }).then(() => {
        console.log("email sent")
    })
}


// main()



/*

    Customer submits request through site -> I overlook it -> send all possible quote options -> customer approves or declines

    Estimated Amount: 1201.30


    HAS TO BE PAID:
    Car: 350.00
    Electric: 220.00
    Credit Card: 100.00
    Total: 670.00 Remaining: 531.00

    LESS IMPORTANT BUT STILL NEEDS ATTENTION
    Electric: 220.00 (SECOND PAYMENT)
    TMOBILE: 67.29 or full 288.07
    Credit Card: 100.00 (CreditOne)
    Insurance: 197.20 (DUE IN 16 Days)
 */