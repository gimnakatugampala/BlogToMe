//add admin cloud functions
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email:adminEmail}).then(result =>{
        console.log(result);
    });
});

//traking user 
auth.onAuthStateChanged(user =>{
    if(user){
        db.collection('posts').onSnapshot(snapshot =>{
            setupBlog(snapshot.docs);
        })

        setupUI(user)

    }else{
        setupBlog([]);
        setupUI();
    }
})

//create a blog Post
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    db.collection('posts').add({
        title:createForm['title'].value,
        content:createForm['content'].value
    }).then(() =>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err =>{
        document.querySelector('.error').innerHTML = err.message;
    }) 
})

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    //enter the values
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        // console.log(cred);
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm['signup-bio'].value
        })
      
    }).then(() =>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err =>{
        document.querySelector('.error').innerHTML = err.message;
    })
})

//signout
const logout = document.querySelector('#logout');
logout.addEventListener('click',() =>{
    auth.signOut();
})

//signin
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        // console.log('user logged in',cred.user);
        //close the modal
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err =>{
        document.querySelector('.error').innerHTML = err.message;
    })
})