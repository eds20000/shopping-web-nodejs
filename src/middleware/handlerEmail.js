const nodemailer = require('nodemailer');

const handlerSendEmail = async (resetToken,userEmail) =>{

    const pageAdd = process.env.ADDRESS_PAGE
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nthanhsonn@gmail.com',
                pass: 'eeaa wvus yimn bort',
            },
        });
    
        const resetURL = `${pageAdd}/reset-password/${resetToken}`;
    
        await transporter.sendMail({
            to: userEmail,
            subject: '再設定URL発行の申請',
            html: `<div>
                    <p>＊${userEmail} 様＊</p>
                    <p>TS-Shopのパスワード再設定URL発行の申請が受付けられました。</p>
                    
                    <p>パスワード再設定用URL</p>
                    <p>以下のリンクからパスワード再設定画面が開きます。（リンクの有効期間は申請が受付けられてから1時間です。）</p>
                    <p><a href="${resetURL}">${resetURL}</a></p>
                    
                    <hr />
                    <p>TS-Shop ホームページURL</p>
                    <p><a href="${pageAdd}">${pageAdd}</a></p>
                    <p>なお、当メールの送信アドレスは送信専用となっております。返信メールでのお問い合わせは承りかねますのでご了承ください。</p>
                </div>`,
        });
    } catch (error) {
        console.error(err);
    }}

module.exports = {
    handlerSendEmail
}
