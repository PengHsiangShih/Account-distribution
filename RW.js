//Connect between apps script and html
function doGet() {
  var html_1 = HtmlService.createTemplateFromFile("Index")
  var check_1 = html_1.evaluate();
  var display_1 = check_1.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return display_1;
}


//Get data range from Google Sheet
function getData(sheet_name, column_number, column_range){
  var spreadsheet_1 = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_1 = spreadsheet_1.getSheetByName(sheet_name);
  var data_1 = sheet_1.getDataRange().getValues();
  if (column_range===1){
    return transfer_func(sheet_1.getRange(2, column_number, data_1.length-1, column_range).getValues());
  }
  else {
    return sheet_1.getRange(2, column_number, data_1.length-1, column_range).getValues();
  } 
}


//Search function
function search_name(input_array) {
  //Data input from user
  var user_name = input_array[0];
  var phone_number = input_array[1];
  var line_ID_1 = input_array[2];
  var grade_1 = input_array[3];
  //Data from spreadsheet
  var match_array = getData('學生名單', 8, 1);
  //Matching
  var match_index = match_array.indexOf(user_name+grade_1+line_ID_1+phone_number);
  //If match nothing
  if (match_index===(-1)){
    input_array.push(0);//set search result
    search_record_func(input_array);
    return (-1);
  }else{//If input data and spreadsheet data matching
    var name_array = getData('學生名單', 1, 8);
    var team_number = name_array[match_index][0];
    var team_array = getData('工作表1', 23, 1);
    var sign_up_index = team_array.indexOf(parseInt(team_number));
    var sign_up_array = getData('工作表1', 5, 22);
    var sign_up_info = sign_up_array[sign_up_index];
    input_array.push(1);//set search result
    input_array.push(team_number);//record team number
    search_record_func(input_array);
    console.log([sign_up_info[1],sign_up_info[2],sign_up_info[3],sign_up_info[8],sign_up_info[13],sign_up_info[19],sign_up_info[20],sign_up_info[21]]);
    //Team name, Tutor, First member, Second member, Third member, Account, Password, Certisfication
    return [sign_up_info[1],sign_up_info[2],sign_up_info[3],sign_up_info[8],sign_up_info[13],sign_up_info[19],sign_up_info[20],sign_up_info[21]];
  }
}

//Transfer second level elements to first level
function transfer_func(trans_array){
  var new_array = [];
  for(var i=0; i<trans_array.length;i++){
    new_array.push(trans_array[i][0]);
  }
  return new_array;
}

//Search record function
function search_record_func(input_record_array){
  //Record data into spreadsheet
  var spreadsheet_1 = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_1 = spreadsheet_1.getSheetByName('工作表3');
  //Record array
  var currentTime = new Date();
  input_record_array.unshift(currentTime);
  sheet_1.appendRow(input_record_array);
}


//Test function
function test_func(){
    var name_array = getData('工作表2', 1, 8);
    var team_number = name_array[3][0];
    var team_array = getData('工作表1', 23, 1);
    var sign_up_index = team_array.indexOf(parseInt(team_number));
    var sign_up_array = getData('工作表1', 5, 19);
    var sign_up_info = sign_up_array[sign_up_index];
    //input_array.push(1);//set search result
    //search_record_func(input_array);
    //Team name, Tutor, First member, Second member, Third member
    //console.log([sign_up_info[1],sign_up_info[2],sign_up_info[3],sign_up_info[8],sign_up_info[13]])
    console.log(sign_up_info)
}


function getData_2(){
  var spreadsheet_1 = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_1 = spreadsheet_1.getSheetByName('工作表2');
  var data_1 = sheet_1.getDataRange().getValues();
  var column_number = 8;
  var column_range = 1;
  if (column_range===1){
    //return transfer_func(sheet_1.getRange(2, column_number, data_1.length-1, column_range).getValues());
    console.log(transfer_func(sheet_1.getRange(2, column_number, data_1.length-1, column_range).getValues())[0])
  }
  else {
    return sheet_1.getRange(2, column_number, data_1.length-1, column_range).getValues();
  } 
}
