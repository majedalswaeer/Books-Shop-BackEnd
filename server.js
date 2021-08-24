'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const mongoLink = process.env.mongno_link;
const server = express();
server.use(cors());
const mongoose = require('mongoose');
server.use(express.json());
// import { useAuth0 } from '@auth0/auth0-react';
// const { user } = this.props.auth0;
//_______________________________________________________________
server.get('/', listenerHandl);
server.get('/books', getbook);
server.post('/postBookFunc', postBookHandler); // be carfull we have to type  server.the method we used like (serer.get or server.post)

server.listen(PORT, () => {
    console.log('listening to port ', PORT);
});
//_______________________________________________________________

mongoose.connect(mongoLink, { useNewUrlParser: true, useUnifiedTopology: true });

const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
})


const bookModel = mongoose.model('books', BookSchema);

function seedDataCollection() {
    const Potter = new bookModel({
        title: 'Harry Potter and the Goblet of Fire',
        description: 'A generation grew up on Rowling all-conquering magical fantasies, but countless adults have also been enthralled by her immersive world. Book four, the first of the doorstoppers, marks the point where the series really takes off. The Triwizard Tournament provides pace and tension, and Rowling makes her boy wizard look death in the eye for the first time.',
        status: 'read',
        email: 'majedalswaeer2@gmail.com'
    })
    const LittleLife = new bookModel({
        title: 'A Little Life',
        description: 'This operatically harrowing American gay melodrama became an unlikely bestseller, and one of the most divisive novels of the century so far. One man’s life is blighted by abuse and its aftermath, but also illuminated by love and friendship. Some readers wept all night, some condemned it as titillating and exploitative, but no one could deny its power.',
        status: 'read',
        email: 'majedalswaeer2@gmail.com'
    })
    const TheCost = new bookModel({
        title: 'The Cost of Living',
        description: 'Chaos is supposed to be what we most fear but I have come to believe it might be what we most want ... ” The second part of Levy’s “living memoir”, in which she leaves her marriage, is a fascinating companion piece to her deep yet playful novels. Feminism, mythology and the daily grind come together for a book that combines emotion and intellect to dazzling effect.',
        status: 'read',
        email: 'majedalswaeer2@gmail.com'
    })
    const Delusion = new bookModel({
        title: 'The God Delusion',
        description: 'From the Sandman comics to his fantasy epic American Gods to Twitter, Gaiman towers over the world of books. But this perfectly achieved children’s novella, in which a plucky young girl enters a parallel world where her “Other Mother” is a spooky copy of her real-life mum, with buttons for eyes, might be his finest hour: a properly scary modern myth which cuts right to the heart of childhood fears and desires.',
        status: 'read',
        email: 'majedalswaeer2@gmail.com'
    })
    const Coraline = new bookModel({
        title: 'Coraline',
        description: 'A key text in the days when the “New Atheism” was much talked about, The God Delusion is a hard-hitting attack on religion, full of Dawkins’s confidence that faith produces fanatics and all arguments for God are ridiculous. What the evolutionary biologist lacks in philosophical sophistication, he makes up for in passion, and the book sold in huge numbers.',
        status: 'read',
        email: 'majedalswaeer2@gmail.com'
    })
    Potter.save();
    LittleLife.save();
    TheCost.save();
    Delusion.save();
    Coraline.save();
}

console.log(bookModel)
// seedDataCollection();

//_______________________________________________________________

function listenerHandl(req, res) {
    res.send('all good');
}

//_______________________________________________________________

//****localhost:3001/books?email=****
function getbook(req, res) {
    let emailaddress2 = req.query.email;
    bookModel.find({ email: emailaddress2 }, function (err, bookData) {
        if (err) {
            console.log('error in getting the data')
        } else {
            //console.log(bookData);
            res.send(bookData);
        }
    })
}

//_______________________________________________________________

async function  postBookHandler(req, res) {
    console.log('whats inside', req.query) // if we console log this it will be an empty object because we are using post so it will not be in the query any more, it will be inside the payload in the body

    console.log('whats inside', req.body) //it will be undefined because we have to declare middle ware by creating server using JSON to parse the request body which is line 10

    //
    let { title, description, status, email } = req.body;

    const addedBook = new bookModel({
        title: title,
        description: description,
        status: status,
        email: email
    })
    await addedBook.save();

    bookModel.find({ email: email }, function (err, bookData) {
        if (err) {
            console.log('Coudnt Reload The Data')
        } else {
            //console.log(bookData);
            res.send(bookData);
        }
    })

}


