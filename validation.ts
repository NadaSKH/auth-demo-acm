import joi from "@hapi/joi";

function regsitValidation(data:any){
    const schema = joi.object({
        name:joi.string().min(6).max(255).required(),
        email:joi.string().required().email(),
        password:joi.string().required().min(8).max(1024)
    })
    return schema.validate(data);
}



export default regsitValidation;