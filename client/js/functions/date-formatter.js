export function dateFormatter(date){
    let n_date = date.split('-');
    return n_date[2]+'/'+n_date[1]+'/'+n_date[0];
}