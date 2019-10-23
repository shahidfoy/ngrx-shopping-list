import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LoadShoppingAction,
  ShoppingActionTypes,
  LoadShoppingSuccessAction,
  LoadShoppingFailureAction,
  DeleteItemAction,
  DeleteItemSuccessAction,
  AddItemFailureAction,
  AddItemAction,
  AddItemSuccessAction,
  DeleteItemFailureAction
} from '../actions/shopping.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ShoppingService } from 'src/app/shopping.service';
import { of } from 'rxjs';

@Injectable()
export class ShoppingEffects {
  constructor(private action$: Actions, private shoppingService: ShoppingService) {}

  @Effect() loadShopping$ = this.action$.pipe(
    ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
    mergeMap(() =>
      this.shoppingService.getShoppingItems().pipe(
        map(data => new LoadShoppingSuccessAction(data)),
        catchError(error => of(new LoadShoppingFailureAction(error)))
      )
    )
  );

  @Effect() addItem$ = this.action$.pipe(
    ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
    mergeMap(data =>
      this.shoppingService.addShoppingItem(data.payload).pipe(
        map(() => new AddItemSuccessAction(data.payload)),
        catchError(error => of(new AddItemFailureAction(error)))
      )
    )
  );

  @Effect() deleteShoppingItem$ = this.action$.pipe(
    ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
    mergeMap(data =>
      this.shoppingService.deleteShoppingItem(data.payload).pipe(
        map(() => new DeleteItemSuccessAction(data.payload)),
        catchError(error => of(new DeleteItemFailureAction(error)))
      )
    )
  );
}
