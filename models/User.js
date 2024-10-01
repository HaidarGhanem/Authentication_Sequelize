module.exports = ( sequelize , DataType ) => {
    const User = sequelize.define("User", {
        username : {
            type : DataType.STRING,
            allowNull : false
        },
        email : {
            type : DataType.STRING,
            allowNull : false
        },
        passwrod : {
            type : DataType.STRING,
            allowNull : false
        }
    })

    return User
}