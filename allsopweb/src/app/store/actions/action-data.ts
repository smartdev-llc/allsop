import { environment } from 'src/environments/environment';
import { Table } from '../table';

export interface IActionData {
  description: string;
  payload: any;
}


export function getActionData(list: any, description: string = ''): IActionData {
  return {
    description: environment.production ? '' : description,
    payload: new Table<string>({
      ids: Object.keys(list),
      list: list
    })
  };
}
