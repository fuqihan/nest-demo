import { Observable } from "rxjs";
import { User } from "./daka.interface";

export interface UserService {
  findOne(data: { id: number }): Observable<any>;
  findOneByPhone(data: { phone: string }): Observable<any>;
  addUser(user: User): Observable<any>;
  findUser(data: {phone: string, passwd: string}): Observable<any>;
  joinRoom(data: {userId: String, room: String}): Observable<any>;
  sendMessage(data: {room: String,
    type: Number,
    userId: String,
    text: String}): Observable<any>;
}

export interface HistoryService {
  findByDate(data: {
    phone: String;
    year: Number;
    month: Number;
    day: Number;
  }): Observable<any>;
  defaultHistory(data: {
    phone: String;
  }): Observable<any>;
  daka(data: {
    phone: String,
    type: String,
    date: String,
    location: String,
  }): Observable<any>;
}

export interface CompanyService {
  addCompany(data: {
    name: String,
    addr: [{
      text: String,
      location: String
    }],
    dept: [String]
  }): Observable<any>;
}
