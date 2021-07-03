const { User } = require("../models");
const bcrypt = require('bcrypt');

class Client {

    async findAllUsers(){
        return User.findAll();
    }

    async signUpUser(body){
    
        // El siguiente código encripta la contraseña
        let password = body.password;
        let passwordHashed = bcrypt.hashSync(password, 10);
        body.password = passwordHashed;
        return User.create(body);
    }

    async userEmail(email){

        return User.findOne({
            where: {email}
        });
    }

    async modifyUser(bodyData){
        let user = await User.update(
            //Datos que cambiamos..
            {firstname: bodyData.firstname, 
            lastname: bodyData.lastname,
            phone: bodyData.phone,
            email: bodyData.email, 
            adress: bodyData.adress},
            //Donde...
            {where: {id: bodyData.userId}})

        return User.findOne({
            where: {id : bodyData.userId}
        });
    }

    async modifyPassword (body) {

        let user = await userController.findUser(body.userId);

        let oldPassword = body.oldPassword;

        let password = user.password;

        console.log( oldPassword, password)

        let verify = await bcrypt.compare(oldPassword, password);
       
        if(!verify){
         throw new Error('Wrong user or password');
        }

        let newPassword = bcrypt.hashSync( body.newPassword, 10);

        let updatepassword = await User.update(
            {password: newPassword},
            //Donde...
            {where: {id: body.userId}}
        )

        return User.findOne({
            where: {id : body.userId}
        });

    }

    async modifySubscription(body){
        
        return User.update(
            {subscription: body.subscription},
            //Donde...
            {where: {id: body.userId}}
        )
    }

    async findUser (id) {
        return User.findOne(
            {where: {id: id}}
        );
    }

    async deleteUser(bodyData){
        if(bodyData.userId != 1){
        return User.destroy({where: {id: bodyData.userId}});
        }
    }

    async isAdminUpdate(body){

        let user = await userController.findUser(body.userId);

        if (user.isAdmin === true && user.id != 1) {
            return User.update(
                {isAdmin: false},
                {where: {id: body.userId}}
            )
        } else if (user.isAdmin === false && user.id != 1) {
            return User.update(
                {isAdmin: true},
                {where: {id: body.userId}}
            )
        }

    }
}

let userController = new Client();
module.exports = userController; 