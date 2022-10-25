import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, child, get, ref } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDedOnQEQ7yPVqXLx6I0YYXHZ_9OT5sDDo",
    authDomain: "gold-blueprint-353900.firebaseapp.com",
    databaseURL: "https://gold-blueprint-353900-default-rtdb.firebaseio.com",
    projectId: "gold-blueprint-353900",
    storageBucket: "gold-blueprint-353900.appspot.com",
    messagingSenderId: "657892393243",
    appId: "1:657892393243:web:3d0bc4736f7d5911c1d3be"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database=getDatabase(app);
const dbRef = ref(getDatabase());

login.addEventListener('click',(e)=>{
    e.preventDefault()
    var email=document.getElementById('emaile').value
    var password=document.getElementById('passwordo').value
    var rol=document.getElementById('rol1').value

    if(verify()==true){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
            const user = userCredential.user;
            if(rol==1){
                get(child(dbRef, 'User/Farmer/' + user.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        location.href="/Farmers/Home.html"
                    }
                    else{
                        Swal.fire({
                            title:'El usuario no es agricultor',
                            icon:'error'
                          })  
                    } 
                })
            }
            else if(rol==2){
                get(child(dbRef, 'User/Buyer/' + user.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        location.href="/Buyer/Home.html"
                    }
                    else{
                        Swal.fire({
                            title:'El usuario no es comprador',
                            icon:'error'
                          })  
                    }  
                })
            }
            else{
                Swal.fire({
                    title:'Debes seleccionar un rol',
                    icon:'error'
                  }) 
            }
    
          
        })
        .catch((error) => {
          Swal.fire({
            title:'El correo o la contraseña son incorrectos',
            icon:'error'
          })
        });
    }
    else{
        Swal.fire({
            title:'Debes llenar todos los campos',
            icon:'error'
          })  
    }

    document.getElementById('form2').reset()
})

function verify(){
    var email=document.getElementById('emaile').value
    var password=document.getElementById('passwordo').value

    if((email.length==0)||(password.length==0)){
        return false;
    }
    else{
        return true;
    }
}