import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pinnedMktCard',
  // pure: false
})
export class PinnedMktCardFilterPipe implements PipeTransform {

  transform(list, filterArr): any {
    
    let filter = filterArr.data;

    if (!filter || !list) {
      return list
    }

    if (filter.length == 0 || list.length == 0) {
      if (filterArr.isPinned) {
        return [];
      }
      return list;
    }

    list[0].pinned = false;
    if (filter.indexOf(list[0].marketId) !== -1) {
      list[0].pinned = true;
      return list;
    }

    if (filterArr.isPinned) {
      return list;
    }

    return list;
  }

}
