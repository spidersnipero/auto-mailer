const express = require('express')


const app = express()
const bP  = require("body-parser")
const port = 3000
app.use(bP.urlencoded({extended:true}))
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const nM = require("nodemailer")
    const mail = req.body.emailtosend;
    console.log(mail);
    const transporter = nM.createTransport({
        service:"hotmail",
        auth : {
            user:"spidersnipero@outlook.com",
            pass:"spidy@Hero8"
        }
    });
    const options = {
        from : "spidersnipero@outlook.com",
        to :mail,
        subject:"ANONYMOUS",
        text : req.body.texttosend,
    }
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err);
            res.sendFile(__dirname+"/error.html");
            return;
        }
        else{
            res.sendFile(__dirname+"/sent.html");
        }
        console.log("Sent "+info.response);
        transporter.close();
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 