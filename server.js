'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const server = express();
server.use(cors());
const mongoose = require('mongoose');

server.get('/', listenerHandl);
server.get('/books', getbook);
function listenerHandl(req, res) {
    res.send('all good');
}

mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true, useUnifiedTopology: true});

const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
})


const bookModel = mongoose.model('books',BookSchema);

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

//localhost:3001/books?email=
function getbook(req,res) {
    console.log('inside getbook func')
    let emailaddress2 = req.query.email;
    bookModel.find({email:emailaddress2},function(err,bookData){
        if(err) {
            console.log('error in getting the data')
        } else {
            console.log(bookData);
            res.send(bookData);
        }
    })
}
server.listen(PORT, () => {
    console.log('listening to port ', PORT);
});

