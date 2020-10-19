import joi from "@hapi/joi";

function loginValidation(data:any){
    const schema = joi.object({
        email:joi.string().required().email(),
        password:joi.string().required().min(8).max(1024)
    })
    return schema.validate(data);
}

export default loginValidation;