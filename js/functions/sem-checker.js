export function semChecker(start_date){

    let split = start_date.split('-');
    
    if(parseInt(split[1])<7){
        return '1º Semestre de '+split[0];
    } else {
        return '2º Semestre de '+split[0];
    }

}