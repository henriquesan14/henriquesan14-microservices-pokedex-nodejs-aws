import * as Yup from 'yup';

export default async (req, res, next) => {
    try{
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email:  Yup.string().email().required(),
            age: Yup.number().integer().required().moreThan(0).lessThan(120),
            city: Yup.string().required(),
            password: Yup.string().min(6).required()
        });

        await schema.validate(req.body, { abortEarly: false});
        return next();
    }catch(err){
        return res.status(400).json({error: 'Validations fails', messages: err.inner });
    }
};