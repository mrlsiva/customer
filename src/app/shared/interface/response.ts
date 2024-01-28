export interface SuccessResponseModel {
  status : string;
  message : string;
  data : any;
  code : string;
}

export interface ResponseModel {
  data : any;
}

export interface ErrorResponseModel {
  status : string;
  message : string;
  data : any;
  code : string;
}
