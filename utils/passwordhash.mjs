import bcrypt from 'bcrypt';

const saltCount = 10;

const hashPassword = (password) =>{

    let salt = bcrypt.genSaltSync(saltCount);
    return bcrypt.hashSync(password, salt);
    
}

const comparePassword = (plain, hash)=>{
    return bcrypt.compareSync(plain, hash);
}
export {hashPassword, comparePassword}