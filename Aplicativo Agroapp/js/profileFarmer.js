import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

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
const db=ref(getDatabase())


close1.addEventListener("click",(e)=>{
    Swal.fire({
      title:'¿Seguro que desea cerrar la sesión?',
      icon:'warning',
      showConfirmButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        signOut(auth).then(() => {
          // Sign-out successful.
          location.href="/Online/Home.html"
        }).catch((error) => {
          // An error happened.
        });
      }
    })
})


onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;

    get(child(db,'User/Farmer/'+user.uid))
    .then((snapshot)=>{
      if(snapshot.exists()){
        document.getElementById('title').textContent=snapshot.val().Nombre
        document.getElementById('location').textContent="Ubicacion: "+snapshot.val().Municipio
        document.getElementById('number').textContent="Teléfono: "+snapshot.val().Número_teléfono
        document.getElementById('address').textContent="Dirección: "+snapshot.val().Direccion

      }
    })

  } else {

  }
});
