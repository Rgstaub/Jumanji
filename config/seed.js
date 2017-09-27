const choices = require('./choicesSeed.js');
const puzzles = require('./puzzlesSeed.js');
const items = require('./itemsSeed.js');
const db = require('../models/');

var seedAll = function(func1,func2, func3) {
    func1().then(()=>{
        console.log('Starting Second function ')
        func2().then(()=>{
            console.log('I was done')
            func3().then(()=>{
                console.log('eff this')
            })
        })
    })
};

var puzzlesSeed = function() {
    return new Promise(function(resolve, reject) {
        puzzles.forEach(function(puzzle){
            db.puzzles.create(puzzle);
        })
        resolve();
    })
   
};

var choicesSeed = function() {
    return new Promise(function(resolve, reject) {
        choices.forEach(function(choice) {
            db.choices.create(choice);
        })
        resolve();
    })
    
};

var itemsSeed = function() {
    return new Promise(function(resolve,reject) {
        items.forEach(function(item) {
            db.items.create(item);
        })
        resolve();
    })
}

seedAll(puzzlesSeed,choicesSeed,itemsSeed);