// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const db=ref(getDatabase())

get(child(db,'BuyerProduct/'))
.then((snapshot)=>{
    if(snapshot.exists()){
        for(var i=0;i<snapshot.val().BuyerProduct.length;i++){
            var posts=document.getElementById('posts')

            
            //Creando elementos
            var div=document.createElement('div')
            var div2=document.createElement('div')
            var img=document.createElement('img')
            var h2=document.createElement('h2')
            var span=document.createElement('span')
            var ul=document.createElement('ul')
            var li=document.createElement('li')
            var a=document.createElement('a')
            var button=document.createElement('button')

            //Asignar clases
            div.className='post'
            div2.className='ctn-img'
            ul.className='ctn-tag'

            //Asignar id
            img.setAttribute("id","imgPag")


            //Insertar los elementos
            posts.appendChild(div)
            div.appendChild(div2)
            div2.appendChild(img)
            div.appendChild(h2)
            div.appendChild(span)
            div.appendChild(ul)
            ul.appendChild(li)
            div.appendChild(a)
            a.appendChild(button)

            //Asignar valores
            img.src=snapshot.val().BuyerProduct[i].Url
            h2.textContent=snapshot.val().BuyerProduct[i].Titulo
            span.textContent=snapshot.val().BuyerProduct[i].Informacion+' - $'+snapshot.val().BuyerProduct[i].Precio
            li.textContent=snapshot.val().BuyerProduct[i].Ubicacion
            button.textContent='Ir'


            button.addEventListener('click',(e)=>{
                
                get(child(db,'BuyerProduct/'))
                .then((snapshot)=>{
                    if(snapshot.exists()){
                        var urlImage=img.getAttribute("src")
                        var idBuyer

                        for(var i=0;i<snapshot.val().BuyerProduct.length;i++){
                            if(snapshot.val().BuyerProduct[i].Url==urlImage){
                                idBuyer=snapshot.val().BuyerProduct[i].Id
                                
                                get(child(db,'User/Buyer/'+idBuyer))
                                .then((snapshot)=>{
                                    if(snapshot.exists()){
                                        Swal.fire({
                                            title:"Datos del comprador",
                                            html:'<label>'+'Nombre '+'<input value='+snapshot.val().Nombre+' readonly></input></label><br>'+
                                                '<label>'+'Municipio '+'<input value='+snapshot.val().Municipio+' readonly></input></label><br>'+
                                                '<label>'+'Número de contacto '+'<input value='+snapshot.val().Número_teléfono+' readonly></input></label><br>'+
                                                '<label>'+'Dirección '+'<input value='+snapshot.val().Direccion+' readonly></input></label><br>'
                                        })
                                    }
                                })
                            }
                        }
                    }
                })
            })

        }
    }
})