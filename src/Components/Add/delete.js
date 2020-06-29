import react from 'react';
import firebase from 'firebase';


export default function  Deletetask(id,rows){

    const userHandle = localStorage.getItem("userHandle")
    const db = firebase.firestore()
    let c = 0
        db.collection(`/users/${userHandle}/lists`)

      .get()
      .then(function(querySnapshot) {
          var abc = querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              
              if(c == id){
                db.collection(`/users/${userHandle}/lists`).doc(doc.id).delete().then(function() {
                  console.log("Document deleted")
                  setTimeout(() => 
                  window.location.reload(),3000)
                  return
                })
                
              }
              c++;
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
     
    }