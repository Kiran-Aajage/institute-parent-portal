import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';
import {
    catchError,
    debounceTime,
    map,
    retry,
    tap,
    timeout,
} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CollectionService {
    constructor(private http: HttpClient, private stateSvc: StateService) {}

    createCollection(data: any) {
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.collectionUrl + '/collection/create', data)
                .subscribe((res) => {
                    console.log(res);
                    resolve(res);
                });
        });
    }

    listCollections(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .post(
                    environment.collectionUrl + '/collection/fetchByOwnerId',
                    { ownershipId: id }
                )
                .subscribe((res: any) => {
                    if (res.status) {
                        resolve(res.collections);
                    } else {
                        resolve([]);
                    }
                });
        });
    }

    raiseCollection(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.collectionUrl + '/collection/raise', {
                    collectionId: id,
                })
                .subscribe((res: any) => {
                    resolve(res);
                });
        });
    }

    getMembersbyCollectionId(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .post(environment.collectionUrl + '/collection/fetchMembers', {
                    collectionId: id,
                })
                .subscribe((res: any) => {
                    resolve(res);
                });
        });
    }
}
