const blogList = document.querySelector('.blogs');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');


//hide or show UI
const setupUI = (user) =>{
    if(user){
        //showing or hiding account details
        db.collection('users').doc(user.uid).get().then(doc =>{
            let html = `
            <div>${user.email}</div>;
            <div>${doc.data().bio}</div>
            
            `;
            accountDetails.innerHTML = html;
        })
       


        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else{
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}


//fetch the blog posts fro DB
const setupBlog = (data) =>{
    if(data.length){
        let html = '';
        data.forEach(doc =>{
            const posts = doc.data();
            let li = `
            <li>
            <div class="collapsible-header grey lighten-4">${posts.title}</div>
            <div class="collapsible-body white">${posts.content}</div>
            </li>
              
            `;
            html += li;
        });
        blogList.innerHTML = html;

    }else{
        blogList.innerHTML = '<h5 class="center-align">Login to View Blogs</h5>';
    }
   
}


//initiate the modals and the collapsible
document.addEventListener('DOMContentLoaded',function(){
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})