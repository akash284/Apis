
// when i run the app it give error : cant use import statement outside a module
// js has two ways to import the files 1) common.js  2)module.js
// the below syntax is from module.js
// js files are in many places to unhe synchronously ,asynchronously use krna pdta hein

// common js use krna heto require wala use krna padta hein yahape code pura synchronously ata h
// ye kaam asynchronous he
// to resolve this error package.json m main k niche ek property add krdo
// "type":"module"
import express from 'express';  

const app=express();

// app.get('/',( req,res) =>{
//     res.send('Server is ready');
// });


// get a list of jokes
app.get('/api/jokes',(req,res) =>{

    const jokes =[
        {
            id:1,
            title:"A Joke 1",
            content:"this is a joke"
        },
        {
            id:2,
            title:"A Joke 2",
            content:"this is a joke 2"
        },
        {
            id:3,
            title:"A Joke 3",
            content:"this is a joke 3"
        },
        {
            id:4,
            title:"A Joke 4",
            content:"this is a joke 4"
        },
        {
            id:5,
            title:"A Joke 5",
            content:"this is a joke 5"
        },
    ]

    res.send(jokes);
});


// port yato env variable se ayga yeto hard code krte h
// env m h port to or wala lelo

// production m environment variable m se hi miilta hein
const port =  process.env.PORT || 3000;


app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);

});
