// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', init);
const modal = document.querySelector('#modal');
modal.className='hidden';

function init(){
  // add 'hidden' class to div#modal
  // add event listener to hearts
  const hearts = document.querySelectorAll('.like-glyph');
  // console.log(hearts);
  // ^^^ didn't work because 'hearts' returns an array-like object
  // and that doens't have an addEventListener default method
  for(const heart of hearts){
    // the 'for' loop iterates over the array-like obj
    heart.addEventListener('click', clickHeart);
  }
}

function clickHeart(eventOrigin){
  // console.log(eventOrigin.target);
  // ^^^ we are getting the right thing
  const target = eventOrigin.target;
  const configOBj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    Accept: "application/json"
    }
  }
  // mimicServerCall("http://mimicServer.example.com", configOBj).then(response => console.log(response))
  // mimicServerCall is considered the fetch here? <<< yeah
  mimicServerCall("http://mimicServer.example.com", configOBj).then( () => {
    /* When the "server" returns a success status:
    Change the heart to a full heart
    Add the .activated-heart class to make the heart appear red
    When a user clicks on a full heart:
    Change the heart back to an empty heart
    Remove the .activated-heart class
    */
    if(target.innerText === EMPTY_HEART){
      // change to full heart
      // console.log(`changing ${target} to full heart`);
      target.innerText = FULL_HEART;
      target.className = 'activated-heart';
    }
    else if (target.innerText === FULL_HEART){
      // change to empty heart
      // console.log(`changing ${target} to empty heart`);
      target.innerText = EMPTY_HEART;
      target.className = '';
    }
  }).catch((er) => {
    console.log(er);
    // catching the error, sending it to modal
    /*
    Display the error modal by removing the .hidden class
    Display the server error message in the modal
    Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
    */
    modal.className = ''; // remove the .hidden class
    modal.querySelector('p').innerText = er; // changed <p> to  the error message
    setTimeout(()=>{modal.className='hidden'}, 3000)
  })
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}