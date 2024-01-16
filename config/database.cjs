const mongoose = require('mongoose');
const Item = require('../models/item.cjs')
const Order = require('../models/order.cjs')

mongoose.connect(process.env.DATABASE_URL);

/*
    DATABASE_URL="paste"
*/
const booksToAdd = [
    {
        name: "Lord of the Flies",
        genre: "Fiction",
        plot: "Some boys get stranded on an island.",
        img: "lord of the flies.jpg"
    },
    {
        name: "Twilight",
        genre: "Young adult",
        plot: "A young girl falls in love with a vampire",
        img: "twilight.webp"
    },
    {
        name: "If You Give a Moose a Muffin",
        genre: "Childrens",
        plot: "A moose eats a muffin",
        img: "moose.webp"
    },
    {
        name: "Coding for Dummies",
        genre: "Education",
        plot: "How to learn to code for beginners",
        img: "coding.webp"
    }
]

function addBooksToDb() {
    booksToAdd.forEach(async book => {
        // check if the book already exists
        const match = await Item.findOne({name: book.name})
        // if it does, don't add it
        if (match) return
        // if it doesn't, add it
        try {
            new Item(book).save()
        } catch (error) {
            
        }
    })
}

const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
    // addBooksToDb()
    // Order.find({}).then(orders => {
    //     console.log(orders)
    // })
});