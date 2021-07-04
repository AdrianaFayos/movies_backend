'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        foreignKey: 'userId'
      });
    }
  };
  User.init({
    firstname: {
      type : DataTypes.STRING,
      validate: {
        isAlpha: {
          msg: "The name can only contain letters",
        },
        len: {
          args: [2, 255],
          msg: "The name must be at least two characters long",
        },
      },
    },  
    lastname: {
      type : DataTypes.STRING,
      validate: {
        isAlpha: {
          msg: "The name can only contain letters",
        },
        len: {
          args: [2, 255],
          msg: "The name must be at least two characters long",
        },
      },
    },  
    email: {
      type : DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Enter a valid email",
        },
      }  
    },
    password: {
      type : DataTypes.STRING,
      validate: {
        len: {
          args: [8, 400],
          msg: "Enter a valid password",
        },
      }  
    },
    isAdmin: DataTypes.BOOLEAN,
    phone:{
      type : DataTypes.STRING,
      validate: {
        len: {
          args: [8, 20],
          msg: "Enter a valid phone",
        },
      },
    }, 
    birthday: {
      type : DataTypes.DATE,
      validate: {
        isDate: {
          msg: "Enter a valid date of birthday",
        },
      }  
    },
    subscription: DataTypes.BOOLEAN,
    adress: {
      type : DataTypes.STRING,
      validate: {
        len: {
          args: [2, 50],
          msg: "Enter a valid city",
        },
      }  
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }

  return User;
};