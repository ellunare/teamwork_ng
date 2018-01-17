import { environment } from "../../environments/environment";

export var _url = 'http://127.0.0.1:8080';

if(environment.production) {
	_url = '';
}