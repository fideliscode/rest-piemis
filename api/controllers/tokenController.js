const User = require('../models/user');
const UserToken = require('../models/token');
//const thehost = 'localhost:4200';
const thehost = 'https://angular-piemis.herokuapp.com';


exports.confirmationPost = function (req, res, next) {
 
    UserToken.findOne({ token: req.body.token }, function (err, token) {
  
        if(!token){return res.status(200)
            .send({ type: 'not-verified',
         message: 'token expired' });} //resend the token

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId}, function (err, user) {
            if (!user) return res.status(200)
            .send({message: 'no token', user:null}); //Re-register 
            if (user.isVerified) return res.status(200)
            .send({user:user , message: 'already verified' });
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(200).send({ message: err.message }); }
                return res.status(200).send({user:user,message:'verified login'});
            });
        });
    });
};

exports.resendTokenPost = function (req, res, next) {
  
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(200).send({ message: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(200).send({ message: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var userToken = new UserToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
       userToken.save(function (err) {
            if (err) { return res.status(200).send({ message: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USERNAME, pass: process.env.GMAIL_PASSWORD } });
            var mailOptions = { from: 'uniinterntz@gmail.com', to: user.email, 
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' +
            'Please verify your account by clicking the link: \nhttp:\/\/' 
            + thehost + '\/users\/confirmation' +'?token=' + userToken.token + '?email='+ user.email + '.\n'}
            

            //sending the mail
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    return res.status(200).send({ message: err.message }); }
                return res.status(200).json({message:"verify_email"});
            });
        });

    });
};
