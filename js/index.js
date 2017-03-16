jQuery(document).ready(function(){
//Put Code inside to prevent newbie changing it with console and inspector
  let eventtime = []; //This is where we stored the time to prevent conflict.
  const color = jQuery('#color').html(); //Save Original color because we going to dom them
  let paypal = jQuery('#credit-card').next(); //Paypal Paragraph is next to credit card
  let bitcoin = paypal.next(); //Bitcoin Paragraph is next to paypal
  let currentprice = 0; //Set the current price to 0 in global scope so we can change them
  const month =      new Date().getMonth() +1  ; //Get Current Month to constant. Due to it start with 0 so we have to plus 1
  const year =      new Date().getFullYear(); //  Get Current Year in yyyy
  function init(){
    jQuery('#credit-card').hide(); //Hide Credit Card
    paypal.hide(); // Hide Paypal
    bitcoin.hide(); //Hide Bitcoin
    
    jQuery("#other-title").hide();
    //Hide other-title field
    jQuery('.activities').append("<p id='totalprice'></p>" );
    //Create Total Price Paragraph so we can dom them
    jQuery('select#color').hide(); // Hide  Color Select
    jQuery('select#color').prev().hide(); //Hide Color Label
    jQuery('form').find('input[type=text]').filter(':visible:first').focus(); //Focus on the first input text element
    jQuery('#name').blur(defavalidatename); //Validate Name on Unfocus
    jQuery('#mail').blur(defavalidateemail);//Validate Email on Unfocus

  }
  init(); //Run init function
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
    //Regular Expression test that this is an email or not and return them
  }
  function defanotempty(str){
    return (str||str.length > 0);
    //Check that string is not empty
  }
  function seterrorcolor(jqueryel){
    jqueryel.css('color',"#c0392b");
    //Set Color To Red so user know it is an error
  }
  function setblackcolor(jqueryel){
    jqueryel.css('color','#000');
    //Set Color To Black so user know that they fix it already
  }
  function defavalidatename(){
    if(defanotempty(jQuery("#name").val()) ) {
      //If name isn't empty return true
      jQuery('label[for="name"]').text("Name:") ;
      setblackcolor(jQuery('label[for="name"]'));
      return true;
    }
      jQuery('label[for="name"]').text("Name:( Please Enter Your Name ) :");
      seterrorcolor(jQuery('label[for="name"]'));

    return false;
    //Return false if it is empty
  }
  function defavalidateemail(){
    //Email Validation
    if(!defanotempty(jQuery("#mail").val())) {
      //If Empty say to user that please enter your email
      jQuery("#mail").prev().text("Email ( Please Enter Your Email ) : ");
      seterrorcolor(jQuery("#mail").prev());
    } else if(isEmail(jQuery("#mail").val()) ){
      //Return true if validation pass
      jQuery("#mail").prev().text("Email:");
    setblackcolor( jQuery("#mail").prev());
      return true; //Return true when pass validation
    }else{
      jQuery("#mail").prev().text("Email ( Please Enter Valid Email ) : ");
      seterrorcolor(jQuery("#mail").prev());
    }
    return false; //Return False if it isn't pass
  }
  function defavalidateactivities(){
    if(jQuery('.activities').find("input[type='checkbox']:checked").length ){
      recalculatecheckbox();
      setblackcolor(jQuery('#totalprice'));
      return true; //If we checked something in activities checkbox
    }
      jQuery('#totalprice').text("Please Select Atleast 1 Activities");
      seterrorcolor(jQuery('#totalprice'));

    return false;
    //We didn't check anything so return false
  }
  function creditcardnotexpire(){
    // Just a simple function to say to user that credit card is not expire
    jQuery("#exp-month").prev().text("Expiration Date:");
    setblackcolor(jQuery("#exp-month").prev());
  }
  function checkexpirationdate(){
    if(jQuery('#exp-year').find('option:selected').val() > year){
      //If the selected year is more than current year , It isn't expire
      creditcardnotexpire(); // Call it because I don't want to repeat myself
      return true;
    }
    if(jQuery('#exp-year').find('option:selected').val() == year && jQuery('#exp-month').find('option:selected').val() >= month){
      //If it the same year but the selected month are more than current month . Credit card doesn't expire
      creditcardnotexpire();// Call it because I don't want to repeat myself
      return true;
    }
    jQuery("#exp-month").prev().text("Expiration Date ( The Select Expiration Date are already expire) :");
    seterrorcolor(jQuery('#exp-month').prev());
    return false; //It is already ecxpire
  }
  function getschedule(jqueryel){
    //Simple Way To Store and Prevent Conflict
    //Just input the Checkbox it will automatically select the closest label
    jqueryel = jqueryel.closest('label');
    let schedule = ""; //No schedule yet
    if(jqueryel.text().indexOf('Tuesday') > 0){
      if(jqueryel.text().indexOf('4pm') > 0){
        schedule = 'tuesdayafternoon'; //Afternoon Tuesday
      }else if(jqueryel.text().indexOf('9am') > 0){
        schedule = 'tuesdaymorning'; //Morning Tuesday
      }
    }
    if(jqueryel.text().indexOf('Wednesday') > 0){
      if(jqueryel.text().indexOf('4pm') > 0){
        schedule = 'wednesdayafternoon'; //Wednesday Afternoon
      }else if( jqueryel.text().indexOf('9am') > 0) {
        schedule = 'wednesdaymorning' //Wednesday Morning
      }
    }
    return schedule; //Return the schedule
  }
  function creditcardlengthcheck(){
   return  (parseInt(jQuery('#cc-num').val()).toString().length <= 16 && (parseInt(jQuery('#cc-num').val()).toString().length >= 13 ));
   //Basic Function to check the length that credit card is between 13 - 16 character
  }

  function defavalidatecard(){
    if( !creditcardlengthcheck() && notnumber(jQuery('#cc-num').val() )  ){
      //It is a number but the length isn't in between 13 - 16 just because informative text
      jQuery('#cc-num').prev().text("Card Number ( Card Number must be 13 - 16 Digit ) :");
      seterrorcolor(jQuery("#cc-num").prev());
    }else   if(!notnumber(jQuery('#cc-num').val())) {
      //IF it wasn't a number , Said another informative text that it isn't a number
      jQuery('#cc-num').prev().text("Card Number ( Card Number must be only number ) :");
      seterrorcolor(jQuery("#cc-num").prev());
    }else if( jQuery('#cc-num').val().trim().toString().length == 0 ){
      // If it is blank state that it is blank
      jQuery('#cc-num').prev().text("Card Number ( Please Enter Your Card Number ) :");
      seterrorcolor(jQuery("#cc-num").prev());
    }else if(creditcardlengthcheck() ){
      //Credit Card Pass. We put it on the lowest because it will check from the top to bottom ;)
      setblackcolor(jQuery("#cc-num").prev());
      jQuery('#cc-num').prev().text("Card Number:");
      return true; // Return true if it is a valid credit card
    }
    return false; // Return false if it isn't a valid credit card
  }
  function checkzipcode(){
    //Check Zip Code
    if(!defanotempty(jQuery('#zip').val().trim().length)){
      //It is blank so we say informative to user
      jQuery('#zip').prev().text("Zip Code: Zip Code is required");
      seterrorcolor(jQuery('#zip').prev());
    }else if(parseInt(jQuery("#zip").val().trim()).toString().length == 5){
      jQuery("#zip").prev().text("Zip Code");
      setblackcolor(jQuery("#zip").prev());
      return true;
      //It is a valid zip code
    }else if (parseInt(jQuery("#zip").val().trim()).toString().length != 5){
      //It is non valid zipcode
      jQuery('#zip').prev().text("Zip Code: Zip Code must 5 Digit number");
      seterrorcolor(jQuery('#zip').prev());
    }    else{
      jQuery('#zip').prev().text("Zip Code: Zip Code must be only number");
      seterrorcolor(jQuery('#zip').prev());
      //Zip Code should be only number
    }
    return false; // Return false
  }
  function notnumber(number){
  return  !isNaN(parseInt(number));
  }
  function checkcvv(){
    if(parseInt(jQuery('#cvv').val()).toString().length == 3 && notnumber(jQuery('#cvv').val()))  {
      jQuery("#cvv").prev().text("CVV:");
      setblackcolor(jQuery("#cvv").prev());
      return true;
      //CVV is 3 character and it is a number great!!
    }else if(defanotempty(jQuery('#cvv').val().trim())) {
      //It is empty , Say to user that it is required
      jQuery('#cvv').prev().text("CVV is Required");
      seterrorcolor(jQuery('#cvv').prev());
    }else{
      //It isn't a valid CVV
      jQuery('#cvv').prev().text("CVV:Please Enter a Valid CVV");
      seterrorcolor(jQuery('#cvv').prev());
    }
    return false;
  }
  function recalculatecheckbox(){
    //Recalculate The activities Checkbox
    currentprice = 0;
    jQuery(".activities input[type=checkbox]").each(function(){
      //Looping Through
      if(eventtime.indexOf(getschedule(jQuery(this))  ) > -1  && !this.checked ) {
        //It is conflict
        jQuery(this).attr('disabled',true);
      }else   if(jQuery(this).prop('disabled') == true ) {
        //It is currently disabled
        if(eventtime.indexOf(getschedule(jQuery(this))) == -1 ){
          //It doesn't conflict anymore - Remove disable attribute
          jQuery(this).removeAttr('disabled');
        }
      }else   if(jQuery(this).prop('checked')){
        //Get The Current Price and Sum them for total price
        currentprice = currentprice + parseInt(jQuery(this).closest("label").text().substr(jQuery(this).closest("label").text().indexOf('$') + 1 , jQuery(this).closest("label").text().length ));
      }
    });
    jQuery('#totalprice').text("Total Price : " + currentprice ); //We output totalprice
    jQuery("#totalprice").css('color','green'); // We make them green. In case it is error before

  }
  jQuery(".activities input[type=checkbox]").change(function(){
    let schedule = getschedule(jQuery(this)); //When we checked some activities checkbox
    if(this.checked){
      //It is check
      eventtime.push(schedule);
      //Push to Array to prevent conflict

    }else{
      //It is uncheck
      eventtime.splice(eventtime.indexOf(schedule),1);
      //Remove from array to renable stuff
    }
    recalculatecheckbox(); //Re-Enable and Do stuff with checkbox again
  });
  function defavalidatedesign(){
    //Validate Design Selection
    if(jQuery('#design').find('option:selected').text() != "Select Theme"){
      //We already choose something not Select Theme
      jQuery('#design').prev().text("Design:");
      setblackcolor(jQuery('#design').prev());

      return true;
    }
    jQuery('#design').prev().text("Design ( Please Select Design ) :");
    //Say Informative to user that you should select design
    seterrorcolor(jQuery('#design').prev());
    return false;

  }
  function checkwrapper(){
    defavalidatename(); // I have to do this for browser compatibility and say all the informative text
    defavalidatename(); defavalidateemail(); checktitle(); checkcreditcardwrapper();defavalidateactivities(); defavalidatedesign();
    return  (defavalidatename() && defavalidateemail() && checktitle() && checkcreditcardwrapper() && defavalidateactivities() && defavalidatedesign()) == true; //Return them to submit function
  }
  jQuery('form').submit(function(event){
    event.preventDefault(); //Stop them first for browser compatibility
    if(checkwrapper() == true){ //Everything pass ?
    jQuery(this).unbind().submit();  //Allow them
 }
  });
  jQuery('#title').change(function(){
    if(jQuery(this).find('option:selected').val() == "other"){ //We choosing other
      jQuery("#other-title").show(); //Other title text field showing up
      jQuery("#other-title").blur(checktitle); //We create an unfocus bind event
    }else{
      //We not choosing other title anymore
      jQuery("#other-title").unbind(); //Unbind other-title

      jQuery("#other-title").hide(); // Hide them again

    }
    checktitle(); //Re-Check Title

  });
  jQuery("select#design").change(function(){
    //Check Design Button
    if(jQuery(this).find('option:selected').text() == "Select Theme"){
      //If it not select anything aka back to Select Theme
      jQuery('#color').hide(); //Hide Color
      jQuery('#color').prev().hide(); //Hide Color Label

    }else{
      jQuery('#color').html(color); //Reload the color
      let search = jQuery(this).find('option:selected').text().replace('Theme - ',''); //Get The Search String
      jQuery('select#color option').each(function(){
        //Loop them through
        if(jQuery(this).text().indexOf(search) == -1) { //If not matched? Remove
          jQuery(this).remove();
        }
      });
      jQuery('#color').show();//Show it to the world
      jQuery('#color').prev().show();//Also show the label

    }
  });
  jQuery("#payment").change(function(){
    //When select payment change
    switch(jQuery(this).find('option:selected').val()){
      case 'credit card':
      paypal.hide(); //Hide Paypal
      bitcoin.hide(); //Hide Bitcoin
      jQuery('#credit-card').show(); //Show Credit Card etc.
      break;
      case 'paypal':
      jQuery('#credit-card').hide();
      bitcoin.hide();//Similar
      paypal.show();
      break;
      case 'bitcoin':
      paypal.hide();
      jQuery('#credit-card').hide();
      bitcoin.show();//Similar
      break;
      default:break;
    }
    jQuery("#payment").prev().text("I'm going to pay with :"); //Set the text in case we got error before
    setblackcolor(jQuery("payment").prev()); //Set it to black color in case user got error before
    checkcreditcardwrapper(); //Re-Check Credit Card Payment and other System

  });
  /*
  function checkcolor(){
    if(jQuery('#color').find('option:selected').text().indexOf(jQuery('#design').find('option:selected').text()) == -1){
      jQuery("#color").prev().text("Color:");
      setblackcolor(jQuery("#color").prev());
      return true;
    }
    jQuery("#color").prev().text("Color (The Choosen Color is not correct):");
    seterrorcolor(jQuery("#color").prev());
    return false;
Too rare case - Remove
  }
*/
  function checktitle(){
    if(jQuery('#title').find('option:selected').val() == "other"){
      //If title is other
      if(!(defanotempty(jQuery("#other-title").val()))){
        jQuery("#title").prev().text("Job Role : Please Specify Your Title");
        seterrorcolor(jQuery('#title').prev());
        return false;
        //If it is empty , Say that it is an error
      }
    }
    jQuery("#title").prev().text("Job Role :");
    setblackcolor(jQuery("#title").prev());
    return true;
    //Otherwise , It is fine
  }
  function checkcreditcardwrapper(){
    //Just a simple wrapper to wrap all the credit card function at once
    if(jQuery("#payment").find('option:selected').val() == "select_method"){
      jQuery("#payment").prev().text("I'm going to pay with (Please Select Payment Method ) :" );
      seterrorcolor(jQuery("#payment").prev());
    }else if(jQuery("#payment").find('option:selected').val() == "credit card"){
      jQuery("#cc-num").blur(defavalidatecard);
      jQuery("#exp-year").change(checkexpirationdate);
      jQuery("#exp-month").change(checkexpirationdate);
      jQuery('#cvv').blur(checkcvv);
      jQuery("#zip").blur(checkzipcode);
checkcvv(); defavalidatecard() ; checkzipcode() ; checkexpirationdate() ; checkzipcode();
      return  checkcvv() && defavalidatecard() && checkzipcode() && checkexpirationdate() && checkzipcode();
    }else{
      jQuery("#cc-num").unbind();
      jQuery("#exp-year").unbind();
      jQuery("#exp-month").unbind();
      jQuery('#cvv').unbind();
      jQuery("#zip").unbind();
      return true;
    }
  }
//That is it! Hooray! We make it to the end
});
