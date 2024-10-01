const Joi = require ('joi')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const db = require ('../models')

const PrivateKey = "PrivateKey"

const JoiSchema = Joi.object({
    username: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const Signup = ( username , email , password ) => {
    return new Promise ((resolve , reject)=>{
        let validation = JoiSchema.validate( username , email , password )

        if ( validation.error ) {
            reject(validation.error.details.message)
        }

        db.User.count({where : {email: email}})
        .then(user =>{
            if(user != 0){
                reject("This Email Is In Use")
            }
            else{
                bcrypt.hash(password , 10)
                .then(hashedPassword =>{
                    db.User.create({
                        username : username,
                        email : email,
                        password : hashedPassword
                    })
                    .then(()=>{
                        resolve ("User Has Been Created")
                    })
                })
            }
        })
    })
}


const Login = ( email , password ) => {
    return new Promise ((resolve , reject)=>{
        db.User.findOne({where : {email : email}})
        .then(user =>{
            if(!user){
                reject("Invalid Email or Password")
            }
            else{
                bcrypt.compare(password , user.password)
                .then(same =>{
                    if(!same){
                        reject("Invalid Email or Password")
                    }
                    else{
                        const token = jwt.sign({id:user.id , email:user.email} , PrivateKey ,{
                            expiresIn : '1h'
                        })
                        resolve({
                            token : token,
                            msg : "Login Done"
                        })
                    }
                })
            }
        })
    })

}