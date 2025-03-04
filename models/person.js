const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Defining the person schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number,  required: true },
    work: {type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    address: { type: String,  required: true},
    salary: { type: Number, required: true },
    username: { type: String, required: true},
    password: { type: String, required: true}
});



personSchema.pre('save', async  function(next){
    const person = this ;
    //hassh the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashPassword = await bcrypt.hash(person.password, salt);

        // overide the plain password with the hash password
        person.password = hashPassword
        next();
    }catch(err){
        return next(err);

    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
