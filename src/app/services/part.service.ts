import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {Part} from "../entities/part";
import {AuthHttp} from "angular2-jwt";
import {Response} from "@angular/http";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class PartService {

  constructor(private authHttp: AuthHttp) {}

}
