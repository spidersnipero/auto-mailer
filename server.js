const express = require('express')
const nM = require("nodemailer")
const transporter = nM.createTransport({
    service:"hotmail",
    auth : {
        user:"spidersnipero@outlook.com",
        pass:"spidy@Hero8"
    }
});

const app = express()
const bP  = require("body-parser")
const port = 3000
app.use(bP.urlencoded({extended:true}))
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const options = {
        from : "spidersnipero@outlook.com",
        to :""+req.emailtosend,
        subject:"ANONYMOUS",
        text : ""+req.texttosend,
    }
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err);
            return;
        }
        console.log("Sent "+info.response);
    })
    console.log(req.body)
    res.sendFile(__dirname+"/sent.html")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})