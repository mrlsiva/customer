export const FORM_VALIDATION = {
	max_length : {
    password:20,
    username:15,
    email:254,
	},
	min_length : {
    password:8,
		username:3,
	},
	restrict_regex:{
		name:'^[a-zA-Z \-\]{1,15}$',
		role_name:'^[a-zA-Z \-\]{1,20}$',
		role_code:'^[a-zA-Z_ \-\]{1,20}$',
		last_name:'^[a-zA-Z \-\]{1,15}$',
		user_name:'^[a-zA-Z0-9_\-\]{1,15}$',
		tag_restrict:'^\s*-?[^<><|>]+\s*$',
		address:'^[a-zA-Z0-9_&,#/. \-\]{1,250}$',
		phone:/^[0-9 +()-]{1,15}$/im,
		phone_code:'^[0-9-+]{1,5}$',
		city:'^[a-zA-Z0-9- ]{1,25}$',
		address_name:'^\s*-?[^<>!$%^<|>]+\s*$',
		postal_code:'^[0-9-]{1,6}$',
		credit_card:'^[0-9 \-\]{1,}$',
    color_code:'^\s*-?[^<>!$%^<|>]+\s*$',
    number_only:/^[0-9.]{1,15}$/im,
    alpha_only:'^[a-zA-Z ]{1,30}$'
	},

	validation_regex:{
		name:"^[a-zA-Z \-\]{3,15}$",
		role_name:"^[a-zA-Z \-\]{3,20}$",
		role_code:"^[a-zA-Z_ \-\]{3,20}$",
		last_name:"^[a-zA-Z \-\]{1,15}$",
		user_name:"^(?!.*__)[a-zA-Z0-9][a-zA-Z0-9_]{2,15}$",
		email:"^(?!.*__)[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$",
		postal_code:'^[0-9]{2,5}(:|\\-)?[0-9]{3,4}',
		tag_restrict:'^\s*-?[^<>$%^<|>]+\s*$',
		password:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,20}',
		login:'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}|[A-Za-z0-9_]{3,8}$',
		upper_case_only:/[A-Z]/,
		lower_case_only:/[a-z]/,
		special_character:/[!@#$%^&*]/,
		number_only:/\d/,
		phone_code:'^[+][0-9]{1,5}$',
		phone:/^((\\+91-?)|0)?[0-9]{10}$/,
    numberOnly: /^(0|[1-9]\d*)(\.\d+)?$/,
    pan_no:"[A-Z]{5}[0-9]{4}[A-Z]{1}",
    url:/^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
	}
}

