
const { validateSignUp } = require('./valid');
const firebase = require('firebase');
const base = require('../dest');
exports.signup = (req,res) => {
    const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userHandle: req.body.userHandle
    }
    const { valid,errors } = validateSignUp(newUser);
    if (!valid) return res.status(402).json(errors);
    //res.status(400).json(newUser.password)
    let token, userId;
    //console.log(newUser.userHandle)
        
        const db = base.firestore().collection("users");

        db.doc(`${newUser.userHandle}`).get()
        .then(doc => {
            if(doc.exists){
                console.log(doc.data().email)
                return res.status(401).json({err: err.code});
            }
            else{

                firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
            .then(data => {
                userId = data.user.uid
                return data.user.getIdToken();
            })
            .then(token => {
                token = token;
            
                const userCredentials = {
                    userHandle: newUser.userHandle,
                    email: newUser.email,
                    userId: userId
                }
               return db.doc(`${newUser.userHandle}`).set(userCredentials);
            })
            .then(() => {
                return res.status(200).json({ token });
            }) 
            .catch((err) => {
                return res.status(501).json({err : err.code})
            })
        }
    })

}
exports.login = (req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        userHandle: req.body.userHandle
    };
    const db = base.firestore().collection("users");

    db.doc(`${user.userHandle}`).get()
    .then(doc => {
        if(!doc.exists){
            return res.status(401).send("this handle does not exists" );
        }
        if (doc.exists){
            //console.log(doc.data())
            if (doc.data().email !== user.email){
                return res.status(401).send("this email does not match with handle")
            }
        }
    })
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
        return data.user.getIdToken()

    })
    .then(token => {
        return res.status(200).json({ msg: 'success' });
    })
    .catch(err => {
        console.log(err.code);
        return res.status(500).json({message: err.code});
    })
}




exports.logout = (req,res) => {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out')
        return res.status(201).json({msg: 'signed out'})
    })
    .catch(err => {
        return res.status(501).json({error: err.code});
    })
}

