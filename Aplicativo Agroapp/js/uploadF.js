// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, set, update, child, get } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getStorage, ref as ref2, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";
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
const db2=getDatabase()
const storage=getStorage()


uploadInf.addEventListener('click', (e)=>{
    Swal.fire({
        title:'Digite la siguiente información',
        html:'<input id='+'title'+' placeholder='+'Nombre_Producto'+'></input><br>'+
            '<textarea id='+'info'+' placeholder='+'Descripcion_Producto'+'></textarea><br>'+
            '<input id='+'price'+' type='+'number'+' placeholder='+'Precio_Producto'+'></input><br>'+
            '<select id='+'location'+' name='+'option'+'>'+
              '<option hidden selected value='+' "0" '+'>Escoja una opcion</option>'+
              '<option value='+' "Madrid" '+'>Madrid</option>'+
              '<option value='+' "Mosquera" '+'>Mosquera</option>'+
              '<option value='+' "Zipacón" '+'>Zipacón</option> '+
              '<option value='+' "Facatativá" '+'>Facatativá</option>'+
              '<option value='+' "Bojacá" '+'>Bojacá</option> '+
              '<option value='+' "Funza<" '+'>Funza</option> '+
              '<option value='+' "Subachoque" '+'>Subachoque</option> '+
              '<option value='+' "El Rosal" '+'>El Rosal</option> '+
            '</select><br>'+
            '<input id='+'image'+' type='+'file'+'></input>',
        showConfirmButton:true
    }).then((result)=>{
        uploadInfoFarmer()
    })
})


function uploadInfoFarmer(){
    var title=document.getElementById('title').value
    var info=document.getElementById('info').value
    var price=document.getElementById('price').value
    var location=document.getElementById('location').value
    var image=document.getElementById('image')

    var publisherFarmer=new Object()
    var productsFarmers=[]


    if(title.length==0 || info.length==0 || price.length==0 || location==0 || image.length==0){
        Swal.fire({
            title:'Error, debe llenar todos los campos',
            icon:'error'
        })
    }
    else{
        //Subiendo la imagen
        const storageRef = ref2(storage, 'Imágenes/'+image.files[0].name)
        const uploadTask=uploadBytesResumable(storageRef,image.files[0] )
        const imageProducts=ref2(storage,'Imágenes/'+image.files[0].name)

        uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
          
          getDownloadURL(imageProducts).then((url)=>{
            onAuthStateChanged(auth,(user)=>{
              if(user){
                get(child(db,'FarmerProduct/'))
                .then((snapshot)=>{
                    if(snapshot.exists()){
                        productsFarmers.splice(0,snapshot.val().FarmerProduct.length)
                        for(var i=0;i<snapshot.val().FarmerProduct.length;i++){
                            productsFarmers.push(snapshot.val().FarmerProduct[i])
                        }
        
                        publisherFarmer.Titulo=title
                        publisherFarmer.Informacion=info
                        publisherFarmer.Precio=price
                        publisherFarmer.Ubicacion=location
                        publisherFarmer.Url=url
                        publisherFarmer.Id=user.uid
        
                        productsFarmers.push(publisherFarmer)
        
                        update(ref(db2,'FarmerProduct/'),{
                            FarmerProduct:productsFarmers
                        })
                    }
        
                    else{
                        //Asignando valores al objeto
                        publisherFarmer.Titulo=title
                        publisherFarmer.Informacion=info
                        publisherFarmer.Precio=price
                        publisherFarmer.Ubicacion=location
                        publisherFarmer.Url=url
                        publisherFarmer.Id=user.uid
        
                        productsFarmers.push(publisherFarmer)
        
                        set(ref(database,'FarmerProduct/'),{
                            FarmerProduct:productsFarmers
                        })
                    }
                })
              }
            })

                    
        })
        }

      );



    }
}

